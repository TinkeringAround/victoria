import * as BABYLON from 'babylonjs';

import {getFileNameFromAssetImport, getRootUrlFromAssetImport} from "../services/UtilityService";

import {Well} from "./Meshes";

export default class GameMaster {

    // Attributes
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;

    constructor(canvas: string) {
        this._canvas = document.getElementById(canvas) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);

        // Background Color
        this._scene.clearColor = new BABYLON.Color4(0.2, 0.22, 0.27);

        // TODO: Correct Camera
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 25, -45), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);

        // TODO: Correct Lighting
        this._light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light.diffuse = BABYLON.Color3.White();
        this._light["range"] = 100;
        
        // this._light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 100, this._scene);
        // this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 35, 0), this._scene);

        BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, this._scene);
    }

    createScene(): void {
        // TODO: Add Correct Mesh
        BABYLON.SceneLoader.ImportMesh("", getRootUrlFromAssetImport(Well), getFileNameFromAssetImport(Well), this._scene, (newMesh) => {
            console.log("Successfully Loaded");
        });
    }

    doRender(): void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}
