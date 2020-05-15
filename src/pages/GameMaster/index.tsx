import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import TMenuTabs from "../../types/TMenuTabs";
import {TViewMode} from "../../types/TViewMode";

import PlayerContext from "../../contexts/PlayerContext";
import GameMasterContext from "../../contexts/GameMasterContext";
import LoadingContext from "../../contexts/LoadingContext";

import LevelMaster from "../../game/LevelMaster";

import NavigationBarPartial from "./Partials/NavigationBarPartial";
import CanvasPartial from "./Partials/CanvasPartial";
import PlayerStatsPartial from "./Partials/PlayerStatsPartial";
import CurrentLevelPartial from "./Partials/CurrentLevelPartial";
import MenuPartial from "./Partials/MenuPartial";
import DetailsPartial from "./Partials/DetailsPartial";
import WorldMapPartial from "./Partials/WorldMapPartial";

const CHAPTER_MASTER_ID = "levelMaster";
const DURATION = 1500;
const DELAY = 100;
const MENU_DURATION = 1000;

const GameMasterPage: FC = () => {
    const {toggleLoadingScreen} = useContext(LoadingContext);
    const {player} = useContext(PlayerContext);

    const [menuTab, setMenuTab] = useState<null | TMenuTabs>(null);

    const [levelMaster, setLevelMaster] = useState<LevelMaster | null>(null);
    const [viewMode, setViewMode] = useState<TViewMode>("detail");

    const [level, setLevel] = useState<number>(0);
    const [region, setRegion] = useState<string>("");

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
            // TODO: Implement
            console.log("TODO: Implement Game Menu");
        }
    }, [viewMode, levelMaster, level, toggleViewMode]);

    return (
        <GameMasterContext.Provider value={{
            id: CHAPTER_MASTER_ID,
            levelMaster: levelMaster,

            viewMode: viewMode,
            level: level,
            region: region,

            menuTab: menuTab,
            setMenuTab: setMenuTab
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
            </Box>
        </GameMasterContext.Provider>
    );
}

export default GameMasterPage;
