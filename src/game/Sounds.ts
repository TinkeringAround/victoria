import intro from "../assets/sounds/intro.mp3";
import menu from "../assets/sounds/menu.mp3";
import button from "../assets/sounds/button.mp3";
import successShort from "../assets/sounds/success-short.mp3";
import successLong from "../assets/sounds/success-long.mp3";
import boiling from "../assets/sounds/boiling.mp3";
import home from "../assets/sounds/home.mp3";
import game from "../assets/sounds/game.mp3";
import fail from "../assets/sounds/fail.mp3";
import dice from "../assets/sounds/dice.mp3";

type TSoundCollection = {
    [name: string]: any
}

const SOUNDS: TSoundCollection = {
    "intro": intro,
    "menu": menu,
    "button": button,
    "success-short": successShort,
    "success-long": successLong,
    "boiling": boiling,
    "home": home,
    "game": game,
    "fail": fail,
    "dice": dice
}

export default SOUNDS;
