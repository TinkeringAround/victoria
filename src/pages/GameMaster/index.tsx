import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TMenuTabs} from "../../types/TMenuTabs";

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
const LOADING_DURATION = 5000;
const ANIMATION_DURATION = 2000;
const MENU_ANIMATION_DURATION = 1000;

const GameMasterPage: FC = () => {
    const {showLoadingScreenForDuration} = useContext(LoadingContext);
    const [menuTab, setMenuTab] = useState<false | TMenuTabs>(false);

    const [levelMaster, setLevelMaster] = useState<LevelMaster | null>(null);
    const [level] = useState<number>(0);
    const [viewMode, setViewMode] = useState<"world" | "detail">("detail");

    const [region, setRegion] = useState<string>("");
    const [world, setWorld] = useState<string>("");

    useEffect(() => {
        if (levelMaster == null && document.getElementById(CHAPTER_MASTER_ID)) {
            const newLevelMaster = new LevelMaster(CHAPTER_MASTER_ID, selectWorld, selectRegion);

            console.log(`Create LevelMaster for Level ${level}`);
            newLevelMaster.createLevel(level);
            newLevelMaster.doRender();
            showLoadingScreenForDuration(LOADING_DURATION);
            setLevelMaster(newLevelMaster);
        }
    }, []);

    const selectRegion = useCallback((regionName: string) => {
        if (regionName !== "") setRegion(regionName);
        else setRegion("");
    }, []);

    const selectWorld = useCallback((worldName: string) => {
        if (worldName !== "") setWorld(worldName);
        else setWorld("");
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

    return (
        <GameMasterContext.Provider value={{
            id: CHAPTER_MASTER_ID,
            levelMaster: levelMaster,

            menuIsOpen: menuTab,
            setMenuIsOpen: setMenuTab
        }}>
            <Box width="100%"
                 height="100%"
                 background="dark"
                 direction="row"
                 animation={{type: "fadeIn", duration: ANIMATION_DURATION, delay: LOADING_DURATION}}
                 style={{
                     position: "relative",
                     overflow: "hidden"
                 }}
            >
                {/* Navigation Bar */}
                <NavigationBarPartial menuAnimationDuration={MENU_ANIMATION_DURATION}/>

                {/* Current Level */}
                <CurrentLevelPartial level="Krähenwald"/>

                {/* Player Stats */}
                <PlayerStatsPartial visible={!menuTab}
                                    playerLevel={10}
                                    playerExperience={45}/>

                {/* Canvas */}
                <CanvasPartial/>

                {/* Menu */}
                <MenuPartial menuAnimationDuration={MENU_ANIMATION_DURATION}/>

                {/* TODO: Details Menu for Selected Mesh*/}
                <DetailsPartial level={level} regionName={menuTab === false && viewMode === "detail" ? region : ""}/>

                {/* TODO: WorldMap Button */}
                <WorldMapPartial worldMapIsOpen={viewMode === "world"} click={toggleViewMode}/>
            </Box>
        </GameMasterContext.Provider>
    );
}

export default GameMasterPage;
