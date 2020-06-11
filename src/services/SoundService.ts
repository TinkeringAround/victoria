import TAudios from "../types/TAudios";

import SOUNDS from "../game/Sounds";

const TICK = 0.1;

export const initAudioSource: (id: string) => HTMLAudioElement = (id) => {
    const audio = new Audio("");
    audio.muted = false;
    audio.autoplay = false;
    audio.loop = true;
    audio.setAttribute("muted", "");
    audio.setAttribute("autoplay", "");
    audio.setAttribute("id", id);

    audio.addEventListener("click", () => audio.pause());

    return audio;
}

export const load = (audioSource: HTMLAudioElement, soundName: string) => {
    audioSource.setAttribute("src", SOUNDS[soundName]);
    audioSource.load();
}

export const play: (audioSource: HTMLAudioElement, soundName?: string) => Promise<any> = (audioSource, soundName = "") => {
    const isPlaying = !audioSource.paused;

    if (!isPlaying && soundName === "") {
        return fadeIn(audioSource);
    }

    if (!isPlaying && soundName !== "") {
        load(audioSource, soundName);
        return fadeIn(audioSource);
    }

    if (isPlaying && soundName !== "") {
        fadeOut(audioSource);
        load(audioSource, soundName);
        return fadeIn(audioSource);
    }

    return new Promise(resolve => resolve());
}

export const pause = (audioSource: HTMLAudioElement) => fadeOut(audioSource);


function fadeIn(audioSource: HTMLAudioElement) {
    audioSource.volume = 0.0;

    const fadeAudioInterval = setInterval(function () {
        if ((audioSource.volume + TICK) <= 1.0) audioSource.volume += TICK;
        else clearInterval(fadeAudioInterval);
    }, 1000);

    return new Promise(((resolve, reject) => audioSource.play().then(resolve).catch(reject)));
}

function fadeOut(audioSource: HTMLAudioElement) {
    const fadeOutAudioInterval = setInterval(function () {
        if ((audioSource.volume - TICK) >= 0.0) audioSource.volume -= TICK;
        else {
            clearInterval(fadeOutAudioInterval);
            audioSource.pause();
        }
    }, 250);
}

export const AUDIOS: TAudios = {background: initAudioSource("background"), effect: initAudioSource("effect")};

