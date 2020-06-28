import {TLevel} from "../types/TLevel";

// LOCAL TEST
// import level0Single from "../assets/meshes/level0_Single.babylon";
// import level0Multi from "../assets/meshes/level0_Multi.babylon";

const level0Single = "https://assets.ctfassets.net/df3z1ez0ud42/1Cs06ApThG8nInKgCk3F5m/06cb7a5f3fdf3df1ae03c7493aaa56b9/level0_Single.babylon";
const level0Multi = "https://assets.ctfassets.net/df3z1ez0ud42/39YWBPNVJUrqRdqqtDZUcH/85a93621d469e86b714cea0b01ba6605/level0_Multi.babylon";

const LEVELS: Array<TLevel> = [
    {
        name: "Krähenwald",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
        meshes: {
            single: level0Single,
            multi: level0Multi,
            all: ["Acker", "DeepForest", "MotherTree", "Treasure", "Island", "Well"],
            regions: ["Acker", "DeepForest", "MotherTree", "Treasure"],
            basePosition: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        regions: {
            "MotherTree": {
                name: "Baum des Lebens",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Ratte"],
                rewards: {
                    items: ["Zweig", "Petersilie", "Stein", "Zweig", "Petersilie"],
                    count: 2,
                    gold: 0
                },
                difficulty: 1
            },
            "Acker": {
                name: "Ackerland",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Schlange"],
                rewards: {
                    items: ["Petersilie", "Morgenstunde", "Zweig", "Petersilie", "Morgenstunde"],
                    count: 4,
                    gold: 0
                },
                difficulty: 1
            },
            "DeepForest": {
                name: "Wolfshöhle",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Wolf"],
                rewards: {
                    items: ["Wolfszahn"],
                    count: 2,
                    gold: 0
                },
                difficulty: 1
            },
            "Treasure": {
                name: "Drei Steine",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Schlange", "Ratte"],
                rewards: {
                    items: ["Stein", "Zweig"],
                    count: 3,
                    gold: 3
                },
                difficulty: 1
            }
        }
    }
]

export default LEVELS;
