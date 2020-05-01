import {AbstractMesh, Animation, ArcRotateCamera, CubicEase, EasingFunction, Vector3} from "babylonjs";

// Camera
export const changeCameraAngleTo = (camera: ArcRotateCamera, alpha: number, beta: number, speed: number, radius: number) => {
    const loopMode = new CubicEase();
    loopMode.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation('alpha', camera, "alpha", speed, 120, camera.alpha, alpha, 0, loopMode);
    Animation.CreateAndStartAnimation('beta', camera, "beta", speed, 120, camera.beta, beta, 0, loopMode);
    Animation.CreateAndStartAnimation("radius", camera, "radius", speed, 120, camera.radius, radius, 0, loopMode);
}

export const lockCameraPosition = (camera: ArcRotateCamera, canvas: HTMLElement, locked: boolean = true) => {
    locked ? camera.detachControl(canvas) : camera.attachControl(canvas, false);
}

export const moveCameraTargetTo = (camera: ArcRotateCamera, target: Vector3, speed = 60) => {
    const loopMode = new CubicEase();
    loopMode.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation("target", camera, "target", speed, 120, camera.target, target, 0, loopMode);
}

// Meshes
export const moveMeshTo = (mesh: AbstractMesh, position: Vector3, speed = 60) => {
    const loopMode = new CubicEase();
    loopMode.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation("position", mesh, "position", speed, 120, mesh.position, position, 0, loopMode);
}
