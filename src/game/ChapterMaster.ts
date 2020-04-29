import {
    AbstractMesh,
    ActionManager,
    ArcRotateCamera,
    Engine,
    ExecuteCodeAction,
    HemisphericLight,
    IShadowLight,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Vector3
} from 'babylonjs';

import {
    createArcRotateCamera,
    createBackgroundLightInScene,
    createFogFor,
    createPointLight,
    createShadowGeneratorFor
} from "../services/InitializerService";
import {getFileNameFromAssetImport, getRootUrlFromAssetImport} from '../services/MeshLoaderService';

import {BACKGROUND, BLUE, RED, WHITE} from "./Colors";
import CHAPTERS from "./Chapters";
import MESHES from "./Meshes";

export default class ChapterMaster {

    // CONSTS
    private CHAPTER_ISLAND_NAME = "Island";
    private BACKGROUND_LIGHT = "Light_Background";

    // Engine Attributes
    private readonly _canvas: HTMLCanvasElement;
    private readonly _engine: Engine;
    private readonly _scene: Scene;
    private _camera: ArcRotateCamera;
    private _backgroundLight: HemisphericLight;
    private _lights: Array<IShadowLight> = [];
    private _shadowGenerators: Array<ShadowGenerator> = [];

    // Game Attributes
    private _activeLevel: string = "";

    // Handler Attributes
    private _selectRegion: any;

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
        this._backgroundLight = createBackgroundLightInScene(this.BACKGROUND_LIGHT, this._scene);

        // Fog Settings
        createFogFor(this._scene);

        // Handler Settings
        this._selectRegion = selectMesh;
    }

    //#region Level Creation
    public createLevel(level: number): void {
        this.createLightAndShadowForLevel(level);
        this.loadMeshForLevel(level);
    }

    private createLightAndShadowForLevel(level: number): void {
        if (level === 0) {
            this._lights.push(
                createPointLight("white", new Vector3(-15, 25, 5), this._scene, WHITE, 6000, 60),
                createPointLight("red", new Vector3(-5, 5, 15), this._scene, RED, 3000, 25),
                createPointLight("blue", new Vector3(-5, 5, -10), this._scene, BLUE, 750, 20));
        }

        this._shadowGenerators.push(createShadowGeneratorFor(this._lights[0]));
    }

    private loadMeshForLevel(level: number): void {
        SceneLoader.ImportMesh("", getRootUrlFromAssetImport(MESHES[level]), getFileNameFromAssetImport(MESHES[level]), this._scene, (newMesh) => {
                newMesh.forEach(mesh => {

                        // Actions Manager
                        if (CHAPTERS[level].meshes.includes(mesh.name)) {
                            mesh.actionManager = new ActionManager(this._scene);
                            this.createOverlayActionManagerFor(mesh);
                            this.createOnClickActionManagerFor(mesh);
                        }

                        // Apply Light to Mesh
                        this._backgroundLight.includedOnlyMeshes.push(mesh);
                        this._lights.forEach(light => light.includedOnlyMeshes.push(mesh));

                        // Apply Shadow to Mesh
                        if (mesh.name.includes(this.CHAPTER_ISLAND_NAME)) mesh.receiveShadows = true;
                        this._shadowGenerators.forEach(shadowGenerator => shadowGenerator?.getShadowMap()?.renderList?.push(mesh));
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
                    this._selectRegion(mesh.name);
                } else {
                    this._activeLevel = "";
                    this._selectRegion("");
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
