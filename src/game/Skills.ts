type TSkillCollection = {
    [name: string]: {
        description: string
        multiplier: number
    }
}

const SKILLS: TSkillCollection = {
    "Angriff": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.5 // 2 Punkte = 1 Schaden
    },
    "Verteidigung": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.75   // 4 Punkte = 7 Verteidigung
    },
    "Ausdauer": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 1    // 1 Punkt = 1 Leben
    },
    "Alchemie": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.8  // 10 Punkte  = 8 Schaden
    },
    "Handwerk": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.8 // 10 Punkte = 8
    }
}

export default SKILLS;
