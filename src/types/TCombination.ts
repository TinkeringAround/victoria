export type TCombinationAnimation = "short" | "long"

export type TCombinationDto = {
    name: string | null
    animation: TCombinationAnimation
}

export type TCombination = {
    requirements: Array<string>
    result: {
        name: string
        amount: number
    }
};

