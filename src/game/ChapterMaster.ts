import {
    ArcRotateCamera,
    Color3,
    Color4,
    Engine,
    HemisphericLight,
    Light,
    Mesh,
    PointLight,
    Scene,
    SceneLoader,
    ShadowGenerator,
    StandardMaterial,
    Vector3
} from 'babylonjs';

import {getFileNameFromAssetImport, getRootUrlFromAssetImport} from '../services/MeshLoaderService';

import {Chapter1} from "./Meshes";

export default class ChapterMaster {

    // Attributes
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _camera: ArcRotateCamera;
    private _light: Array<Light>;

    constructor(canvas: string) {
        this._canvas = document.getElementById(canvas) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);

        // TODO: General Setup
        // Scene Settings
        this._scene.clearColor = new Color4(0.2, 0.22, 0.27, 1);

        // TODO: Correct Camera
        this._camera = new ArcRotateCamera("arcCamera", 3, 1.2, 40, new Vector3(0, 0, 0), this._scene, true);
        this._camera.attachControl(this._canvas, false);
        this._camera.wheelPrecision = 30;

        // TODO: Correct Lighting
        this._light = [];
        var backgroungLight = new HemisphericLight("BackgroundLight", Vector3.Zero(), this._scene);
        backgroungLight.diffuse = new Color3(1, 1, 1);
        backgroungLight.specular = new Color3(1, 1, 1);
        backgroungLight.intensity = 2;

        this._light.push(backgroungLight);
    }

    createLevel(level: number): void {
        switch (level) {
            case 1:
                this.createLevel1();
                break;
        }
    }

    private createLevel1() {
        // TODO: Chapter 1 Setup
        var whiteLight = new PointLight("PointLight", new Vector3(1, 1, 0), this._scene);
        whiteLight.diffuse = new Color3(1, 1, 1);
        whiteLight.specular = new Color3(1, 1, 1);
        whiteLight.intensity = 2000;
        whiteLight.radius = 25;
        // whiteLight.setDirectionToTarget(new BABYLON.Vector3(0, 7, 0));
        whiteLight.position = new Vector3(15, 20, 15);

        var lightSphere0 = Mesh.CreateSphere("Sphere0", 16, 0.5, this._scene);
        var whiteMaterial = new StandardMaterial("blue", this._scene);
        whiteMaterial.diffuseColor = new Color3(0, 0, 0);
        whiteMaterial.specularColor = new Color3(0, 0, 0);
        whiteMaterial.emissiveColor = new Color3(1, 1, 1);
        lightSphere0.material = whiteMaterial;

        this._light.push(whiteLight);

        // TODO: Remove Animations
        var alpha = 0;
        this._scene.beforeRender = function () {
            whiteLight.position = new Vector3(10 * Math.sin(alpha), 15, 10 * Math.cos(alpha));
            lightSphere0.position = whiteLight.position;
            alpha += 0.01;
        };

        // Shadows
        const shadowGenerator = new ShadowGenerator(1024, whiteLight);
        shadowGenerator.setDarkness(0.5);
        shadowGenerator.usePoissonSampling = true;

        // TODO: Add Correct Mesh
        SceneLoader.ImportMesh("", getRootUrlFromAssetImport(Chapter1), getFileNameFromAssetImport(Chapter1), this._scene, (newMesh) => {

            newMesh.forEach(mesh => {
                // TODO: Optimize Mesh Shadow etc.
                whiteLight.includedOnlyMeshes.push(mesh);
                if (mesh.name.includes("Island")) mesh.receiveShadows = true;
                shadowGenerator?.getShadowMap()?.renderList?.push(mesh);
            });

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
