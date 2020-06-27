type TEnemy = {
    name: string
    image: any
    stats: {
        health: number
        attack: number
        armor: number
        experience: number
    }
    rewards: Array<string>
}

export default TEnemy;
