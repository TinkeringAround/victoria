import TPlayer from "../types/TPlayer";

type TExperienceGain = {
    levelUp: number
    experience: number
}

export const gainExperience: (player: TPlayer, experience: number) => TExperienceGain = (player, experience) => {
    return {
        levelUp: Math.floor((player.experience + experience) / 100),
        experience: (player.experience + experience) % 100
    };
}
