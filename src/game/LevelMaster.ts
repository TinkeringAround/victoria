import * as BABYLON from 'babylonjs';

import {getFileNameFromAssetImport, getRootUrlFromAssetImport} from '../services/UtilityService';
import {Chapter1} from "./Meshes";

export default class LevelMaster {

    // Attributes
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: Array<BABYLON.Light>;

    constructor(canvas: string) {
        this._canvas = document.getElementById(canvas) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);

        // Scene Settings
        this._scene.clearColor = new BABYLON.Color4(0.2, 0.22, 0.27, 1);

        // TODO: Correct Camera
        this._camera = new BABYLON.ArcRotateCamera("arcCamera", 3, 1.2, 40, new BABYLON.Vector3(0, 0, 0), this._scene, true);
        this._camera.attachControl(this._canvas, false);
        this._camera.wheelPrecision = 30;

        // TODO: Correct Lighting
        this._light = [];
        var backgroungLight = new BABYLON.HemisphericLight("BackgroundLight", BABYLON.Vector3.Zero(), this._scene);
        backgroungLight.diffuse = new BABYLON.Color3(1, 1, 1);
        backgroungLight.specular = new BABYLON.Color3(1, 1, 1);
        backgroungLight.intensity = 2;

        var whiteLight = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(1, 1, 0), this._scene);
        whiteLight.diffuse = new BABYLON.Color3(1, 1, 1);
        whiteLight.specular = new BABYLON.Color3(1, 1, 1);
        whiteLight.intensity = 2000;
        whiteLight.radius = 25;
        // whiteLight.setDirectionToTarget(new BABYLON.Vector3(0, 7, 0));
        whiteLight.position = new BABYLON.Vector3(15, 20, 15);

        var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, this._scene);
        var whiteMaterial = new BABYLON.StandardMaterial("blue", this._scene);
        whiteMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        whiteMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        whiteMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        lightSphere0.material = whiteMaterial;

        this._light.push(backgroungLight);
        this._light.push(whiteLight);

        // TODO: Remove Animations
        var alpha = 0;
        this._scene.beforeRender = function () {
            whiteLight.position = new BABYLON.Vector3(10 * Math.sin(alpha), 15, 10 * Math.cos(alpha));
            lightSphere0.position = whiteLight.position;
            alpha += 0.01;
        };

        // Shadows
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, whiteLight);
        shadowGenerator.setDarkness(0.5);
        shadowGenerator.usePoissonSampling = true;

        // TODO: Add Correct Mesh
        BABYLON.SceneLoader.ImportMesh("", getRootUrlFromAssetImport(Chapter1), getFileNameFromAssetImport(Chapter1), this._scene, (newMesh) => {
            console.log(newMesh);

            newMesh.forEach(mesh => {
                // TODO: Optimize Mesh Shadow etc.
                whiteLight.includedOnlyMeshes.push(mesh);
                // if (mesh.name.includes("Island")) mesh.receiveShadows = true;
                mesh.receiveShadows = true;
                // shadowGenerator.addShadowCaster(mesh);
                shadowGenerator?.getShadowMap()?.renderList?.push(mesh);
            });

            console.log("Successfully Loaded");
        });
    }

    createScene(): void {

        // BABYLON.Mesh.CreateSphere("Sphere", 16, 3, this._scene);

        // const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this._scene);
        // groundMaterial.specularColor = BABYLON.Color3.Black();
        // groundMaterial.diffuseColor = BABYLON.Color3.Gray();
        // groundMaterial.specularPower = 1;
        //
        // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, this._scene);
        // ground.overlayColor = new BABYLON.Color3(1, 0, 0);
        // ground.receiveShadows = true;
        // ground.material = groundMaterial;

        // this._scene.createDefaultEnvironment();
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
