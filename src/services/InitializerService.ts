import {
    ArcRotateCamera,
    Color3,
    HemisphericLight,
    IShadowLight,
    PointLight,
    Scene,
    ShadowGenerator,
    Vector3
} from "babylonjs";

import {WHITE} from "../game/Colors";

// Camera
export const createArcRotateCamera: (canvas: HTMLElement, scene: Scene) => ArcRotateCamera = (canvas, scene) => {
    const arcCamera = new ArcRotateCamera("ArcCamera", 3, 1.2, 35, new Vector3(0, 0, 0), scene, true);
    arcCamera.attachControl(canvas, false);
    arcCamera.wheelPrecision = 30;

    return arcCamera;
}

// Background Light
export const createBackgroundLight: (backgroundLightName: string, scene: Scene) => HemisphericLight = (backgroundLightName, scene) => {
    const backgroundLight = new HemisphericLight(backgroundLightName, Vector3.Zero(), scene);
    backgroundLight.diffuse = WHITE;
    backgroundLight.specular = WHITE;
    backgroundLight.intensity = 1;

    return backgroundLight;
}

// Scene Fog
export const createFogFor: (scene: Scene) => void = (scene) => {
    scene.fogMode = Scene.FOGMODE_EXP;
    scene.fogDensity = 0.03;
    scene.fogStart = 0;
    scene.fogEnd = 100;
}

// ShadowGenerator
export const createShadowGeneratorFor: (light: IShadowLight) => ShadowGenerator = (light) => {
    const shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.setDarkness(0.5);
    shadowGenerator.usePoissonSampling = true;

    return shadowGenerator;
}

// Point Light
export const createPointLight: (name: string, position: Vector3, scene: Scene, color: Color3, itensity: number, radius: number) => PointLight = (name, position, scene, color, itensity, radius) => {
    const pointLight = new PointLight("PointLight-" + name, position, scene);
    pointLight.diffuse = color;
    pointLight.specular = color;
    pointLight.intensity = itensity;
    pointLight.radius = radius;

    return pointLight;
}
