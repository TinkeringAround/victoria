const CHAPTERS = [
    {
        name: "Krähenwald",
        meshes: ["Acker", "DeepForest", "MotherTree", "Treasure"],
        regions: {
            "MotherTree": {
                name: "Baum des Lebens",
                enemies: [0, 1, 2],
                treasures: [0, 1]
            },
            "Acker": {
                name: "Ackerland",
                enemies: [],
                treasures: []
            },
            "DeepForest": {
                name: "Wolfshöhle",
                enemies: [],
                treasures: []
            },
            "Treasure": {
                name: "Drei Steine",
                enemies: [],
                treasures: []
            }
        }
    }
]

export default CHAPTERS;
