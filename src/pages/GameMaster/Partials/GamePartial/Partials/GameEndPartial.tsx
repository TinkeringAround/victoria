import React, {FC, useContext, useEffect, useState} from 'react';
import {Box, Heading, Text} from "grommet";

import TGameResult from "../../../../../types/TGameResult";
import TGameState from "../../../../../types/TGameState";
import TRewards from "../../../../../types/TRewards";

import {colors} from "../../../../../styles/theme";

import GameMasterContext from "../../../../../contexts/GameMasterContext";
import PlayerContext from "../../../../../contexts/PlayerContext";
import SoundContext from "../../../../../contexts/SoundContext";

import {gainedExperience, getRewards} from "../../../../../services/GameService";
import {changeColorBrightness} from "../../../../../services/ColorService";

import ButtonComponent from "../../../../../components/ButtonComponent";
import MenuCardComponent from "../../../../../components/MenuCardComponent";
import GameRewardComponent from "../../../../../components/GameRewardComponent";

import ITEMS from "../../../../../game/Items";
import WEAPONS from "../../../../../game/Weapons";
import LEVELS from "../../../../../game/Levels";

const ANIMATIONS = [1, 2, 3, 4];
const SUCCESS = [1000, 2000, 3000, 4000];
const FAILURE = [1000, 2000, 3000, 4000];

interface Props {
    result: TGameResult
    gameState: TGameState | null

    onFinish: (rewards: TRewards | null, experienceGain: number) => void
}

const GameEndPartial: FC<Props> = ({result, gameState, onFinish}) => {
    const {player} = useContext(PlayerContext);
    const {level, region} = useContext(GameMasterContext);
    const {playEffect} = useContext(SoundContext);

    const [state, setState] = useState<number>(0);
    const [rewards, setRewards] = useState<TRewards | null>(null);
    const [experienceGain, setExperienceGain] = useState<number>(0);

    const startAnimation = () => {
        ANIMATIONS.forEach((animationStep, index) =>
            setTimeout(() => setState(animationStep), isWin ? SUCCESS[index] : FAILURE[index]));
    }

    const onLeaveGameEndScreen = () => {
        setState(0);
        setRewards(null);
        onFinish(rewards, experienceGain)
    }

    useEffect(() => {
        if (player && gameState && result != null && state === 0) {
            setExperienceGain(gainedExperience(player, gameState.enemies));

            if (isWin) setRewards(getRewards(LEVELS[level].regions[region], gameState.enemies));

            startAnimation();
        }
    }, [player, gameState, result])

    useEffect(() => {
        if (state === 1) playEffect(isWin ? "success-long" : "fail");
    }, [state])

    const isPlaying = result != null;
    const isWin = result === "win";
    const bg = isWin ? "light" : "dark";

    return (
        <React.Fragment>
            {level >= 0 && region != null &&
            <Box animation={isPlaying && state > 0 ? {type: "fadeIn"} : "fadeOut"}
                 height={window.innerHeight + "px"}
                 width={window.innerWidth + "px"}
                 background={bg}
                 style={{position: "absolute", zIndex: isPlaying ? 700 : -1}}>

                {/* Win-Star / Loose-Poop */}
                <Box animation={state >= 2 ? (isWin ? ["fadeIn", "pulse"] : "fadeIn") : "fadeOut"}
                     width="100%" height="100%" align="center" justify="center" style={{zIndex: 699}}>
                    {isWin ?
                        <svg width="100%" height="100%" viewBox="0 0 1920 1080">
                            <g transform="matrix(1.59558,0,0,1.6104,-543.609,-555.956)"
                               style={{fill: changeColorBrightness(colors.gold, 20)}}>
                                <path
                                    d="M978.879,144.167L1060.87,396.5L1218.86,318.525L1193.53,492.883L1458.85,492.883L1244.2,648.834L1367.18,775.001L1193.53,804.785L1275.52,1057.12L1060.87,901.168L978.879,1057.12L896.891,901.168L682.243,1057.12L764.231,804.785L590.577,775.001L713.559,648.834L498.911,492.883L764.231,492.883L738.895,318.525L896.891,396.5L978.879,144.167Z"/>
                            </g>
                            <g transform="matrix(1.74072,0.665886,-0.659758,1.75689,-321.178,-1267.82)"
                               style={{fill: colors.gold}}>
                                <path
                                    d="M978.879,144.167L1060.87,396.5L1218.86,318.525L1193.53,492.883L1458.85,492.883L1244.2,648.834L1367.18,775.001L1193.53,804.785L1275.52,1057.12L1060.87,901.168L978.879,1057.12L896.891,901.168L682.243,1057.12L764.231,804.785L590.577,775.001L713.559,648.834L498.911,492.883L764.231,492.883L738.895,318.525L896.891,396.5L978.879,144.167Z"/>
                            </g>
                        </svg> :
                        <svg width="100%" height="100%" viewBox="0 0 1920 1080">
                            <g transform="matrix(9.59305,0,0,9.59305,-395.862,-200)" style={{fill: colors.gold}}>
                                <path
                                    d="M130.5,3C136.267,22.539 131.733,31.615 119.654,37.615C93.112,44.88 88.965,59.966 101.192,80.769C75.348,78.64 65.728,100.052 78.115,121.154C49.032,123.811 39.431,151.804 65.423,171.923L214.962,172.615C247.394,157.995 238.144,128.159 210.577,122.308C220.908,95.535 212.4,82.08 187.038,80.538C196.815,59.259 194.806,43.354 169.5,38.077C160.377,20.113 147.623,10.502 130.5,3Z"/>
                            </g>
                        </svg>}
                </Box>


                {/* Content */}
                <Box animation={state >= 3 ? {type: "zoomIn", size: "xlarge"} : "fadeOut"}
                     width="100%" height="100%" align="center" justify="center"
                     style={{position: "absolute", top: 0, left: 0, zIndex: 701}}>

                    <Heading size="4rem"
                             margin="1rem 0 2rem"
                             color="white"
                    >
                        Du hast <Text size="4rem"
                                      color="dark">{isWin ? "gewonnen" : "verloren"}</Text>{isWin ? "!" : "..."}
                    </Heading>

                    {/* Rewards */}
                    <Box width="50%" direction="row" wrap justify="center" align="center" margin={{bottom: "3rem"}}>
                        {rewards?.items.map((reward, index) => {
                            const isItem = ITEMS.hasOwnProperty(reward.name);

                            return (
                                <MenuCardComponent key={"GameRewards" + reward.name + index}
                                                   itemOrWeapon={isItem ? ITEMS[reward.name] : WEAPONS[reward.name]}
                                                   amount={reward.amount}
                                                   noAnimation
                                />
                            )
                        })}

                        {/* Experience */}
                        {experienceGain > 0 &&
                        <GameRewardComponent type="exp" amount={experienceGain}/>}

                        {/* Gold */}
                        {rewards && rewards.gold > 0 &&
                        <GameRewardComponent type="gold" amount={rewards.gold}/>}
                    </Box>

                    {/* Button */}
                    <Box animation={state > 3 ? "fadeIn" : "fadeOut"}>
                        <ButtonComponent color="white"
                                         background={changeColorBrightness(colors.dark, 20)}
                                         hoverColor="dark"
                                         margin="0"
                                         fontSize="2rem"
                                         onClick={onLeaveGameEndScreen}
                        >
                            Zum {LEVELS[level].name}
                        </ButtonComponent>
                    </Box>
                </Box>

            </Box>}
        </React.Fragment>
    );
};

export default GameEndPartial;
