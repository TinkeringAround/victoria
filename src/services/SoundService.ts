import TAudios from "../types/TAudios";

import SOUNDS from "../game/Sounds";
import TSounds from "../types/TSounds";
import TEffects from "../types/TEffects";

const TICK = 0.1;
const MAX = 0.5;
const EFFECT_MAX = 0.3;

export const initAudioSource: (id: string, volume: number, loop?: boolean) => HTMLAudioElement = (id, volume, loop = true) => {
    const audio = new Audio("");
    audio.muted = false;
    audio.autoplay = false;
    audio.volume = volume;
    audio.loop = loop;
    audio.setAttribute("muted", "");
    audio.setAttribute("id", id);

    audio.addEventListener("click", () => audio.pause());

    return audio;
}

export const load = (audioSource: HTMLAudioElement, soundName: TSounds | TEffects) => {
    audioSource.setAttribute("src", SOUNDS[soundName]);
    audioSource.load();
}

export const play: (audioSource: HTMLAudioElement, soundName?: TSounds | null) => Promise<any> = (audioSource, soundName = null) => {
    const isPlaying = !audioSource.paused;
    const currentSoundName = audioSource.src;

    if (!isPlaying && soundName == null) {
        return fadeIn(audioSource);
    }

    if (!isPlaying && soundName !== null) {
        load(audioSource, soundName);
        return fadeIn(audioSource);
    }

    if (isPlaying && soundName !== null && !currentSoundName.includes(soundName)) {
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
        if ((audioSource.volume + TICK) <= MAX) audioSource.volume += TICK;
        else clearInterval(fadeAudioInterval);
    }, 250);

    return new Promise(((resolve, reject) => audioSource.play().then(() => resolve()).catch(() => reject())));
}

function fadeOut(audioSource: HTMLAudioElement) {
    const fadeOutAudioInterval = setInterval(function () {
        if ((audioSource.volume - TICK) >= 0.0) audioSource.volume -= TICK;
        else {
            clearInterval(fadeOutAudioInterval);
            audioSource.pause();
        }
    }, 75);
}

export const effect = (audioSource: HTMLAudioElement, effectName: TEffects) => {
    load(audioSource, effectName);
    audioSource.play().catch(() => console.log("Effect could not be played."));
}

export const AUDIOS: TAudios = {
    background: initAudioSource("background", 0),
    effect: initAudioSource("effect", EFFECT_MAX, false)
};

