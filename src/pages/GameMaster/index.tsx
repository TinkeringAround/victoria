import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TMenuTabs} from "../../types/TMenuTabs";

import GameMasterContext from "../../contexts/GameMasterContext";
import LoadingContext from "../../contexts/LoadingContext";

import ChapterMaster from "../../game/ChapterMaster";

import NavigationBarPartial from "./Partials/NavigationBarPartial";
import CanvasPartial from "./Partials/CanvasPartial";
import PlayerStatsPartial from "./Partials/PlayerStatsPartial";
import CurrentLevelPartial from "./Partials/CurrentLevelPartial";
import MenuPartial from "./Partials/MenuPartial";

const CHAPTER_MASTER_ID = "levelMaster";
const LOADING_DURATION = 5000;
const ANIMATION_DURATION = 2000;
const MENU_ANIMATION_DURATION = 1000;

const GameMasterPage: FC = () => {
    const {showLoadingScreenForDuration} = useContext(LoadingContext);
    const [chapterMaster, setChapterMaster] = useState<ChapterMaster | null>(null);
    const [level] = useState<number>(1);
    const [menuIsOpen, setMenu] = useState<false | TMenuTabs>(false);
    const [mesh, setMesh] = useState<string>("");

    useEffect(() => {
        if (chapterMaster == null && document.getElementById(CHAPTER_MASTER_ID)) {
            console.log(`Create LevelMaster for Level ${level}`);
            const newChapterMaster = new ChapterMaster(CHAPTER_MASTER_ID, selectMesh);
            newChapterMaster.createLevel(level);
            newChapterMaster.doRender();
            showLoadingScreenForDuration(LOADING_DURATION);
            setChapterMaster(newChapterMaster);
        }
    }, [])

    const selectMesh = useCallback((name: string) => {
        console.log("Selected Mesh:", name);

        if (name !== "") setMesh(name);
        if (name === "" && mesh !== "") setMesh("");
    }, []);

    return (
        <GameMasterContext.Provider value={{
            id: CHAPTER_MASTER_ID,
            chapterMaster: chapterMaster,

            menuIsOpen: menuIsOpen,
            setMenuIsOpen: setMenu
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
                <PlayerStatsPartial visible={!menuIsOpen}
                                    playerLevel={10}
                                    playerExperience={45}/>

                {/* Canvas */}
                <CanvasPartial/>

                {/* Menu */}
                <MenuPartial menuAnimationDuration={MENU_ANIMATION_DURATION}/>

                {/* TODO: Details Menu for Selected Mesh*/}
            </Box>
        </GameMasterContext.Provider>
    );
}

export default GameMasterPage;
