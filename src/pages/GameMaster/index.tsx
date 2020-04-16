import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import MenuPartial from "./Partials/MenuPartial";
import CanvasPartial from "./Partials/CanvasPartial";
import PlayerStatsPartial from "./Partials/PlayerStatsPartial";
import CurrentLevelPartial from "./Partials/CurrentLevelPartial";
import FramePartials from "./Partials/FramePartials";

import LevelMasterContext from "../../contexts/ChapterMasterContext";
import LoadingContext from "../../contexts/LoadingContext";

import ChapterMaster from "../../game/ChapterMaster";

const LEVEL_MASTER_ID = "levelMaster";
const LOADING_DURATION = 5000;
const ANIMATION_DURATION = 2000;
const BANNER_ANIMATION_DURATION = LOADING_DURATION + 750;

const GameMaster: FC = () => {
    const {showLoadingScreenForDuration} = useContext(LoadingContext);
    const [chapterMaster, setChapterMaster] = useState<ChapterMaster | null>(null);
    const [level] = useState<number>(1);

    useEffect(() => {
        if (chapterMaster == null && document.getElementById(LEVEL_MASTER_ID)) {
            console.log("Create LevelMaster");
            const newChapterMaster = new ChapterMaster(LEVEL_MASTER_ID);
            newChapterMaster.createLevel(level);
            newChapterMaster.doRender();
            showLoadingScreenForDuration(LOADING_DURATION);
            setChapterMaster(newChapterMaster);
        }
    }, [])

    return (
        <LevelMasterContext.Provider value={{
            id: LEVEL_MASTER_ID,
            levelMaster: chapterMaster
        }}>
            <Box width="100%"
                 height="100%"
                 background="dark"
                 direction="row"
                 animation={{type: "fadeIn", duration: ANIMATION_DURATION, delay: LOADING_DURATION}}
                 style={{position: "relative"}}
            >
                {/* Menu */}
                <MenuPartial delay={BANNER_ANIMATION_DURATION}/>

                {/* Current Level */}
                <CurrentLevelPartial level="Kapitel 1 - Aufbruch nach Kinarg"/>

                {/* Player Stats */}
                <PlayerStatsPartial playerLevel={10} playerExperience={45}/>

                {/* Canvas */}
                <CanvasPartial/>

                {/* TODO: Frames */}
                <FramePartials visible/>
            </Box>
        </LevelMasterContext.Provider>
    );
}

export default GameMaster;
