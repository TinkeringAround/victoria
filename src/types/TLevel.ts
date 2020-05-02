import {TRegion} from "./TRegion";

export type TLevel = {
    name: string
    description: string
    meshes: {
        single: any
        multi: any
        all: Array<string>
        regions: Array<string>
        basePosition: {
            x: number
            y: number
            z: number
        }
    },
    regions: { [name: string]: TRegion }
}
