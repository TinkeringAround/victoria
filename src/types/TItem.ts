export type TItem = {
    name: string
    description: string
    type: TItemType
    image: any
    effect: TItemEffect | null
}

export type TItemType = "treasure" | "material" | "consumable"

export type TItemDto = {
    name: string
    amount: number
}

export type TItemEffect = {
    target: TItemEffectTarget
    value: number
    description: string
}

export type TItemEffectTarget = "player" | "enemy" | "circle"
