export type TRegion = {
    name: string
    description: string
    enemies: Array<string>
    rewards: {
        items: Array<string>
        count: number
        gold: number
    }
    difficulty: number
}
