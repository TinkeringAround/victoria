import TPlayer from "../types/TPlayer";

type TExperience = {
    newLevel: number
    newExperience: number
}

export const gainExperience: (player: TPlayer, experience: number) => TExperience = (player, experience) => {
    const experienceAndLevel: TExperience = {
        newLevel: player.level + Math.floor((player.experience + experience) / 100),
        newExperience: (player.experience + experience) % 100
    };
    return experienceAndLevel;
}
