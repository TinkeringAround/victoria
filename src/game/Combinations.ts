import {TCombination} from "../types/TCombination";

type TCombinationCollection = {
    [name: string]: TCombination
}

const COMBINATIONS: TCombinationCollection = {
    "Trank": {
        requirements: ["Petersilie", "Morgenstunde"],
        result: {
            name: "Trank",
            amount: 1
        }
    }
}


export default COMBINATIONS;
