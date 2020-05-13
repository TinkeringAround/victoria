type TSkillCollection = {
    [name: string]: {
        description: string
        multiplier: number
    }
}

const SKILLS: TSkillCollection = {
    "Angriff": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 1
    },
    "Verteidigung": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 1.2
    },
    "Agilität": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 1.25
    },
    "Alchemie": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 2
    },
    "Handwerk": {
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
        multiplier: 1.95
    }
}

export default SKILLS;
