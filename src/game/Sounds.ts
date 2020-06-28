const button = "https://assets.ctfassets.net/df3z1ez0ud42/5GTfZU5xOytZDEfJTSDSO/1545eedd90bff66adeffc990d928b02d/button.mp3";
const successShort = "https://assets.ctfassets.net/df3z1ez0ud42/2rJRKF6m0rhle6OCTTuyQp/87b9580c81cade75db378fc9df07abb2/success-short.mp3";
const successLong = "https://assets.ctfassets.net/df3z1ez0ud42/3cwElAf1kEOwvvSh3rx0zi/0c7cc8bbbb7ba7c1f092c784fad8e60f/success-long.mp3";
const game = "https://assets.ctfassets.net/df3z1ez0ud42/3u4punuPoGRMRHD6rMVp60/d185d8e911b1a9de89e1cae14bd6e7db/game.mp3";
const intro = "https://assets.ctfassets.net/df3z1ez0ud42/6KlALLhKiVVj1NVvvCI0rT/d246b169fb008c1b0564d89653aea6d6/intro.mp3";
const home = "https://assets.ctfassets.net/df3z1ez0ud42/1MxmhkGn7SZaucqP5HxLVX/e40fc95d7c781f0a1cb5bc836b885834/home.mp3";
const menu = "https://assets.ctfassets.net/df3z1ez0ud42/7xi8yPBVWZRLUELRmpD1UL/67dda4f3936cfec30a6866b2564e7159/menu.mp3";
const boiling = "https://assets.ctfassets.net/df3z1ez0ud42/2OnaJxImhy868IcoJsLNeY/93bbf47febdcbc726c19fd7cee40ddc6/boiling.mp3";
const fail = "https://assets.ctfassets.net/df3z1ez0ud42/73xHURcCmx5Dt21GpLjfPR/7228e5b82e4319bce9f1005cca1c0d56/fail.mp3";
const dice = "https://assets.ctfassets.net/df3z1ez0ud42/6se9Rp7Q0sAJwOA1rqXxzw/29432f83e21de818623ee039cc4a9a90/dice.mp3";

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
