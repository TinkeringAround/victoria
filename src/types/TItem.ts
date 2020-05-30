export type TItem = {
    name: string
    description: string
    type: TItemType
    image: any
}

export type TItemType = "treasure" | "material" | "consumable"

export type TItemDto = {
    name: string
    amount: number
}
