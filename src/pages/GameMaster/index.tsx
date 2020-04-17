import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import NavigationBarPartial from "./Partials/NavigationBarPartial";
import CanvasPartial from "./Partials/CanvasPartial";
import PlayerStatsPartial from "./Partials/PlayerStatsPartial";
import CurrentLevelPartial from "./Partials/CurrentLevelPartial";

import GameMasterContext from "../../contexts/GameMasterContext";
import LoadingContext from "../../contexts/LoadingContext";

import ChapterMaster from "../../game/ChapterMaster";
import MenuPartial from "./Partials/MenuPartial";

const CHAPTER_MASTER_ID = "levelMaster";
const LOADING_DURATION = 5000;
const ANIMATION_DURATION = 2000;
const BANNER_ANIMATION_DURATION_INIT = LOADING_DURATION + 750;

const GameMasterPage: FC = () => {
    const {showLoadingScreenForDuration} = useContext(LoadingContext);
    const [chapterMaster, setChapterMaster] = useState<ChapterMaster | null>(null);
    const [level] = useState<number>(1);
    const [menuIsOpen, setMenu] = useState<boolean>(false);

    useEffect(() => {
        if (chapterMaster == null && document.getElementById(CHAPTER_MASTER_ID)) {
            console.log(`Create LevelMaster for Level ${level}`);
            const newChapterMaster = new ChapterMaster(CHAPTER_MASTER_ID);
            newChapterMaster.createLevel(level);
            newChapterMaster.doRender();
            showLoadingScreenForDuration(LOADING_DURATION);
            setChapterMaster(newChapterMaster);
        }
    }, [])

    return (
        <GameMasterContext.Provider value={{
            id: CHAPTER_MASTER_ID,
            chapterMaster: chapterMaster
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
                <NavigationBarPartial delay={BANNER_ANIMATION_DURATION_INIT}
                                      menuIsOpen={menuIsOpen}
                                      openMenu={() => {
                                          if (!menuIsOpen) setMenu(true)
                                      }}/>

                {/* Current Level */}
                <CurrentLevelPartial level="Kapitel 1 - Aufbruch nach Kinarg"/>

                {/* Player Stats */}
                <PlayerStatsPartial playerLevel={10}
                                    playerExperience={45}/>

                {/* Canvas */}
                <CanvasPartial/>

                {/* Menu */}
                <MenuPartial menuIsOpen={menuIsOpen}
                             closeMenu={() => setMenu(false)}/>
            </Box>
        </GameMasterContext.Provider>
    );
}

export default GameMasterPage;
