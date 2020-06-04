import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import TMenuTabs from "../../types/TMenuTabs";
import TViewMode from "../../types/TViewMode";
import {TCombinationAnimation, TCombinationDto} from "../../types/TCombination";

import PlayerContext from "../../contexts/PlayerContext";
import GameMasterContext from "../../contexts/GameMasterContext";
import LoadingContext from "../../contexts/LoadingContext";

import LevelMaster from "../../game/LevelMaster";

import {gainExperience} from "../../services/PlayerService";

import NavigationBarPartial from "./Partials/NavigationBarPartial";
import CanvasPartial from "./Partials/CanvasPartial";
import PlayerStatsPartial from "./Partials/PlayerStatsPartial";
import CurrentLevelPartial from "./Partials/CurrentLevelPartial";
import MenuPartial from "./Partials/MenuPartial";
import DetailsPartial from "./Partials/DetailsPartial";
import WorldMapPartial from "./Partials/WorldMapPartial";
import CombinationPartial from "./Partials/CombinationPartial";

import ITEMS from "../../game/Items";

const CHAPTER_MASTER_ID = "levelMaster";
const DURATION = 1500;
const DELAY = 100;
const MENU_DURATION = 1000;
const COMBINATION_EXPERIENCES = [10, 50];

const GameMasterPage: FC = () => {
    const {toggleLoadingScreen} = useContext(LoadingContext);
    const {player, update} = useContext(PlayerContext);

    const [menuTab, setMenuTab] = useState<null | TMenuTabs>(null);

    const [levelMaster, setLevelMaster] = useState<LevelMaster | null>(null);
    const [viewMode, setViewMode] = useState<TViewMode>("detail");

    const [level, setLevel] = useState<number>(0);
    const [region, setRegion] = useState<string>("");

    const [combination, setCombination] = useState<TCombinationDto | null>(null);

    useEffect(() => {
        if (levelMaster == null && document.getElementById(CHAPTER_MASTER_ID)) {
            toggleLoadingScreen(true);
            const newLevelMaster = new LevelMaster(CHAPTER_MASTER_ID, setLevel, setRegion);

            newLevelMaster.createWorld(level).then(() => {
                newLevelMaster.doRender();
                setTimeout(() => {
                    toggleLoadingScreen(false);
                    setLevelMaster(newLevelMaster);
                }, DELAY)
            })
        }
    }, []);

    useEffect(() => {
        if (menuTab != null) levelMaster?.pauseRender();
        else levelMaster?.doRender();
    }, [menuTab])

    const toggleViewMode = useCallback(() => {
        if (levelMaster !== null) {
            if (viewMode === "detail") {
                levelMaster.setViewMode("world");
                setViewMode("world");
            }

            if (viewMode === "world") {
                levelMaster.setViewMode("detail");
                setViewMode("detail");
            }
        }
    }, [levelMaster, viewMode]);

    const playLevelOrRegion = useCallback(() => {
        if (viewMode === "world") {
            levelMaster?.changeLevel(level);
            toggleViewMode();
        }

        if (viewMode === "detail") {
            console.error("TODO: Implement Game Menu"); // TODO: Implement
        }
    }, [viewMode, levelMaster, level, toggleViewMode]);

    const onExecuteCombination = useCallback((newCombination: string | null, materials: Array<string>, animation: TCombinationAnimation) =>
        setCombination({name: newCombination, materials: materials, animation: animation}), [])

    const onFinishedCombination = () => {
        if (combination != null && player != null) {
            const playerItems = Array.from(player.items);
            const playerWeapons = Array.from(player.weapons);
            const playerCombinations = Array.from(player.combinations);

            let combinationExperience = COMBINATION_EXPERIENCES[0];

            // Add new Item
            if (combination.name != null) {
                const isItem = ITEMS.hasOwnProperty(combination.name);

                if (isItem) {
                    const itemIndex = playerItems.findIndex((item) => item.name === combination.name);

                    if (itemIndex < 0) playerItems.push({name: combination.name, amount: 1});
                    else playerItems[itemIndex].amount += 1;
                }

                if (!isItem) {
                    const weaponIndex = playerItems.findIndex((item) => item.name === combination.name);

                    if (weaponIndex < 0) playerWeapons.push({name: combination.name, amount: 1});
                }
            }

            // Remove used Items
            combination.materials.forEach((material) => {
                const materialIndex = playerItems.findIndex(item => item.name === material);

                if (playerItems[materialIndex].amount === 1) playerItems.splice(materialIndex, 1);
                else playerItems[materialIndex].amount -= 1;
            });

            // Update Combinations List
            if (combination.name != null && combination.animation === "long") {
                playerCombinations.push(combination.name);
                combinationExperience = COMBINATION_EXPERIENCES[1];
            }

            // Gain Experience
            const {levelUp, experience} = gainExperience(player, combinationExperience);

            // Reset and Update Player
            setCombination(null);
            update({
                ...player,
                level: player.level + levelUp,
                experience: player.experience + experience,
                items: playerItems,
                weapons: playerWeapons,
                combinations: playerCombinations
            });
        }
    }

    return (
        <GameMasterContext.Provider value={{
            id: CHAPTER_MASTER_ID,
            levelMaster: levelMaster,

            viewMode: viewMode,
            level: level,
            region: region,

            menuTab: menuTab,
            setMenuTab: setMenuTab,

            executeCombination: onExecuteCombination
        }}>
            <Box width="100%"
                 height="100%"
                 background="dark"
                 direction="row"
                 animation={levelMaster !== null ? {type: "fadeIn", duration: DURATION} : "fadeOut"}
                 style={{
                     position: "relative",
                     overflow: "hidden"
                 }}
            >
                {/* Navigation Bar */}
                <NavigationBarPartial menuAnimationDuration={MENU_DURATION}/>

                {/* Current Level */}
                <CurrentLevelPartial/>

                {/* Player Stats */}
                <PlayerStatsPartial visible={!menuTab}
                                    level={player ? player.level : 0}
                                    experience={player ? player.experience : 0}/>

                {/* Canvas */}
                <CanvasPartial/>

                {/* Menu */}
                <MenuPartial menuAnimationDuration={MENU_DURATION}/>

                {/* Details Menu*/}
                <DetailsPartial play={playLevelOrRegion}/>

                {/* WorldMap Button */}
                <WorldMapPartial visible={!menuTab && viewMode === "detail"} click={toggleViewMode}/>

                {/* Combination Overlay */}
                <CombinationPartial combination={combination} onFinished={onFinishedCombination}/>
            </Box>
        </GameMasterContext.Provider>
    );
}

export default GameMasterPage;
