import TPlayer from "../types/TPlayer";
import TExperience from "../types/TExperience";

import SKILLS from "../game/Skills";

const BASE_HEALTH = 5;

export const gainExperience: (player: TPlayer, experience: number) => TExperience = (player, experience) => {
    const experienceAndLevel: TExperience = {
        newLevel: player.level + Math.floor((player.experience + experience) / 100),
        newExperience: (player.experience + experience) % 100
    };
    return experienceAndLevel;
}

export const getPlayerHealth: (player: TPlayer) => number = player => {
    const {Ausdauer} = player.skills;
    return BASE_HEALTH + SKILLS["Ausdauer"].multiplier * (Ausdauer - 1);
}
