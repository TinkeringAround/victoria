import {
    AbstractMesh,
    ActionManager,
    ArcRotateCamera,
    Engine,
    ExecuteCodeAction,
    Light,
    Scene,
    SceneLoader,
    Vector3
} from 'babylonjs';

import {
    createArcRotateCamera,
    createBackgroundLight,
    createFogFor,
    createPointLight,
    createShadowGeneratorFor
} from "../services/InitializerService";
import {getFileNameFromAssetImport, getRootUrlFromAssetImport} from '../services/MeshLoaderService';

import {Chapter1} from "./Meshes";
import {BACKGROUND, BLUE, RED, WHITE} from "./Colors";

export default class ChapterMaster {

    // CONSTS
    private CHAPTER1_MESHES = ["Acker", "DeepForest", "MotherTree", "Treasure"];
    private CHAPTER_ISLAND_NAME = "Island";
    private BACKGROUND_LIGHT = "Light_Background";

    // Engine Attributes
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _camera: ArcRotateCamera;
    private _lights: Array<Light> = [];

    // Game Attributes
    private _activeLevel: string = "";

    // Handler Attributes
    private _selectMesh: any;

    constructor(canvas: string, selectMesh: (name: string) => void) {
        // Canvas Settings
        this._canvas = document.getElementById(canvas) as HTMLCanvasElement;

        // Engine Settings
        this._engine = new Engine(this._canvas, true, {stencil: true});

        // Scene Settings
        this._scene = new Scene(this._engine);
        this._scene.clearColor = BACKGROUND;
        this._scene.ambientColor = BLUE;

        // Camera Settings
        this._camera = createArcRotateCamera(this._canvas, this._scene);

        // Background Light Settings
        this._lights.push(createBackgroundLight(this.BACKGROUND_LIGHT, this._scene));

        // Fog Settings
        createFogFor(this._scene);

        // Handler Settings
        this._selectMesh = selectMesh;
    }

    //#region Level Creation
    public createLevel(level: number): void {
        switch (level) {
            case 1:
                this.createLevel1();
                break;
        }
    }

    private createLevel1() {
        // TODO: Chapter 1 Setup
        // Lights
        const whiteLight = createPointLight("white", new Vector3(-15, 25, 5), this._scene, WHITE, 6000, 60);
        const redLight = createPointLight("red", new Vector3(-5, 5, 15), this._scene, RED, 3000, 25);
        const blueLight = createPointLight("blue", new Vector3(-5, 5, -10), this._scene, BLUE, 750, 20);

        this._lights.push(whiteLight);
        this._lights.push(redLight);
        this._lights.push(blueLight);

        // Shadow Generator
        const shadowGenerator = createShadowGeneratorFor(whiteLight);

        SceneLoader.ImportMesh("", getRootUrlFromAssetImport(Chapter1), getFileNameFromAssetImport(Chapter1), this._scene, (newMesh) => {
                newMesh.forEach(mesh => {

                        // Actions Manager
                        if (this.CHAPTER1_MESHES.includes(mesh.name)) {
                            mesh.actionManager = new ActionManager(this._scene);
                            this.createOverlayActionManagerFor(mesh);
                            this.createOnClickActionManagerFor(mesh);
                        }

                        // Shadows
                        this._lights.forEach(light => light.name !== this.BACKGROUND_LIGHT ? light.includedOnlyMeshes.push(mesh) : null);
                        if (mesh.name.includes(this.CHAPTER_ISLAND_NAME)) mesh.receiveShadows = true;
                        shadowGenerator?.getShadowMap()?.renderList?.push(mesh);
                    }
                );

                console.log("Successfully Loaded");
            }
        );
    }

    //#endregion

    //#region Event Handler
    // Click
    private createOnClickActionManagerFor(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => {
                const currentlyActiveMesh = this._scene.getMeshByName(this._activeLevel);
                if (currentlyActiveMesh) currentlyActiveMesh.renderOverlay = false;

                if (this._activeLevel !== mesh.name) {
                    mesh.renderOverlay = true;
                    mesh.overlayColor = WHITE;
                    mesh.overlayAlpha = 0.5;
                    this._activeLevel = mesh.name;
                    this._selectMesh(mesh.name);
                } else {
                    this._activeLevel = "";
                    this._selectMesh("");
                }
            }
        ));
    }

    // Overlay
    private createOverlayActionManagerFor(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOverTrigger,
            () => {
                if (mesh.name !== this._activeLevel) this.setOverlayForMesh(mesh, true);
            }
        ));

        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOutTrigger,
            () => {
                if (mesh.name !== this._activeLevel) this.setOverlayForMesh(mesh, false);
            })
        );
    }

    private setOverlayForMesh(mesh: AbstractMesh, status: boolean): void {
        mesh.renderOverlay = status;
        mesh.overlayColor = WHITE;
        mesh.overlayAlpha = 0.2;
    }

    //#endregion

    //#region RenderLoop
    public doRender(): void {
        this._engine.runRenderLoop(() => this._scene.render());

        window.addEventListener('resize', () => this._engine.resize());
    }

    public stopRender(): void {
        this._engine.stopRenderLoop();
    }

    //#endregion
}
