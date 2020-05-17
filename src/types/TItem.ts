export type TItem = {
    name: string
    description: string
    type: TItemType
    image: any
}

export type TItemType = "gold" | "crafting" | "weapon" | "shield" | "staff" | "consumable"

export type TItemDto = {
    name: string
    amount: number
}
