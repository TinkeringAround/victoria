const LEVELS = [
    {
        name: "Krähenwald",
        meshes: ["Sign", "Acker", "DeepForest", "MotherTree", "Treasure", "Island", "Rocks", "Trees", "TwoStones", "TwoStones2", "TwoStones.001", "Bridge-1", "Bridge-2", "Well"],
        regionMeshes: ["Acker", "DeepForest", "MotherTree", "Treasure"],
        basePosition: {
            x: 0,
            y: 0,
            z: 0
        },
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

export default LEVELS;
