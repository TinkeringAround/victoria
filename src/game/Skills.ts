type TSkillCollection = {
    [name: string]: {
        description: string
        multiplier: number
    }
}

const SKILLS: TSkillCollection = {
    "Angriff": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.25
    },
    "Verteidigung": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.35
    },
    "Ausdauer": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 1
    },
    "Alchemie": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.4
    },
    "Handwerk": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 0.5
    }
}

export default SKILLS;
