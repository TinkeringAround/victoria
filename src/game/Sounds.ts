import intro from "../assets/sounds/intro.mp3";
import menu from "../assets/sounds/menu.mp3";

type TSoundCollection = {
    [name: string]: any
}

const SOUNDS: TSoundCollection = {
    "intro": intro,
    "menu": menu
}

export default SOUNDS;
