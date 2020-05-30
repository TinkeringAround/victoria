export type TWeapon = {
    name: string
    description: string
    image: any
    type: TWeaponType
    value: number
}

export type TWeaponType = "weapon" | "shield"

export type TWeaponDto = {
    name: string
    amount: number
}
