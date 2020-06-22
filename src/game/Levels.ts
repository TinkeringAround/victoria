import {TLevel} from "../types/TLevel";

import level0Single from "../assets/meshes/level0_Single.babylon";
import level0Multi from "../assets/meshes/level0_Multi.babylon";

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
                items: ["Stock"],
                difficulty: 1
            },
            "Acker": {
                name: "Ackerland",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Ratte", "Schlange"],
                items: ["Petersilie"],
                difficulty: 1
            },
            "DeepForest": {
                name: "Wolfshöhle",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Wolf"],
                items: [],
                difficulty: 3
            },
            "Treasure": {
                name: "Drei Steine",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
                enemies: ["Schlange", "Wolf"],
                items: [],
                difficulty: 1
            }
        }
    }
]

export default LEVELS;
