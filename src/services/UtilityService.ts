export const random = (max: number = 100, min: number = 0) => Math.floor(Math.random() * (max - min)) + min;

export const pickRandomElement: (array: Array<any>) => any = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}
