import intro from "../assets/sounds/intro.mp3";
import menu from "../assets/sounds/menu.mp3";
import button from "../assets/sounds/button.mp3";
import successShort from "../assets/sounds/success-short.mp3";
import successLong from "../assets/sounds/success-long.mp3";
import boiling from "../assets/sounds/boiling.mp3";

type TSoundCollection = {
    [name: string]: any
}

const SOUNDS: TSoundCollection = {
    "intro": intro,
    "menu": menu,
    "button": button,
    "success-short": successShort,
    "success-long": successLong,
    "boiling": boiling
}

export default SOUNDS;
