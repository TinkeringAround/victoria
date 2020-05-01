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
    createShadowGeneratorFor,
} from "../services/InitializerService";
import {
    changeCameraAngleTo,
    lockCameraPosition,
    moveCameraTargetTo,
    moveMeshTo
} from "../services/SceneManipulatorService";
import {getFileNameFromAssetImport, getRootUrlFromAssetImport} from '../services/MeshLoaderService';

import {BACKGROUND, BLUE, RED, WHITE} from "./Colors";
import LEVELS from "./Levels";
import MESHES from "./Meshes";

export default class LevelMaster {

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
    private _viewMode: "world" | "detail" = "detail";
    private _level: number = -1;

    private _activeRegion: string = "";
    private _activeLevel: number = -1;

    // Handler Attributes
    private _selectWorld: any;
    private _selectRegion: any;

    constructor(canvas: string, selectWorld: (worldName: string) => void, selectRegion: (regionName: string) => void) {
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
        this._selectWorld = selectWorld;
        this._selectRegion = selectRegion;
    }

    //#region Level Creation
    public createLevel(level: number): void {
        this._level = level;
        this._activeLevel = level;

        this.createLightAndShadowForLevel(level);
        this.loadMeshForLevel(level);

        moveCameraTargetTo(this._camera, new Vector3(LEVELS[level].basePosition.x, LEVELS[level].basePosition.y, LEVELS[level].basePosition.z));
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
                        // Apply Mesh Position
                        mesh.position = new Vector3(LEVELS[level].basePosition.x, LEVELS[level].basePosition.y, LEVELS[level].basePosition.z);

                        // Actions Manager
                        mesh.actionManager = new ActionManager(this._scene);
                        if (LEVELS[level].regionMeshes.includes(mesh.name)) {
                            this.createClickActionManagerInDetailMap(mesh);
                            this.createOverlayActionManagerFor(mesh);
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

    //#region View Mode
    public setViewMode(mode: "world" | "detail"): void {
        // Set View Mode
        this._viewMode = mode;
        const isWorldMap = mode === "world";

        // Camera
        this.setCameraViewMode(mode);

        // Register ActionManagers on Toggle
        LEVELS[this._level].meshes.forEach(meshName => {
            const mesh = this._scene.getMeshByName(meshName);
            if (mesh) {
                mesh.actionManager?.dispose();
                mesh.actionManager = new ActionManager(this._scene);

                if (isWorldMap) {
                    // this.createOverlayActionManagerInWorldMap(mesh);
                    // this.createClickActionManagerInWorldMap(mesh);
                }

                if (!isWorldMap && LEVELS[this._level].regionMeshes.includes(meshName)) {
                    this.createOverlayActionManagerFor(mesh);
                    this.createClickActionManagerInDetailMap(mesh);
                }
            }
        });
    }

    private setCameraViewMode(mode: "world" | "detail"): void {
        const isWordMap = mode === "world";
        if (this._camera !== null) {
            changeCameraAngleTo(this._camera, isWordMap ? Math.PI : 3, isWordMap ? 0 : 1.2, 60, isWordMap ? 100 : 35);
            lockCameraPosition(this._camera, this._canvas, isWordMap);
        }
    }

    //#endregion

    //#region View = Details
    // Click
    private createClickActionManagerInDetailMap(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => {
                const currentlyActiveMesh = this._scene.getMeshByName(this._activeRegion);
                if (currentlyActiveMesh) currentlyActiveMesh.renderOverlay = false;

                if (this._activeRegion !== mesh.name) {
                    this.setOverlayForMesh(mesh, true, 0.5);
                    this._activeRegion = mesh.name;
                    this._selectRegion(mesh.name);
                    this.moveAllMeshes("left");
                } else {
                    this._activeRegion = "";
                    this._selectRegion("");
                    this.moveAllMeshes("right");
                }
            }
        ));
    }

    // Overlay
    private createOverlayActionManagerFor(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOverTrigger,
            () => mesh.name !== this._activeRegion ? this.setOverlayForMesh(mesh, true) : null
        ));

        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOutTrigger,
            () => mesh.name !== this._activeRegion ? this.setOverlayForMesh(mesh, false) : null
        ));
    }

    //#endregion

    //#region View = Worlds
    private createClickActionManagerInWorldMap(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => {
                if (mesh) {
                    const index = this.getLevelIndexByMesh(mesh);
                    if (index >= 0) {
                        if (this._activeLevel === index) {
                            this._activeLevel = -1;
                            this._selectWorld("");
                        } else {
                            this._activeLevel = index;
                            this._selectWorld(LEVELS[index].name);
                        }
                    }
                }
            }
        ));
    }

    private createOverlayActionManagerInWorldMap(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOverTrigger,
            () => this.getLevelIndexByMesh(mesh) !== this._activeLevel ? this.setOverlayForLevel(this._activeLevel, true) : null
        ));

        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOutTrigger,
            () => this.getLevelIndexByMesh(mesh) !== this._activeLevel ? this.setOverlayForLevel(this._activeLevel, false) : null
        ));
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

    //#region Utilty
    private getMeshByName(meshName: string): AbstractMesh | null {
        const mesh = this._scene.getMeshByName(meshName);
        return mesh ? mesh : null;
    }

    private setOverlayForLevel(level: number, status: boolean): void {
        LEVELS[level].meshes.forEach(mesh => this.setOverlayForMesh(this.getMeshByName(mesh), status));
    }

    private setOverlayForMesh(mesh: AbstractMesh | null, status: boolean, overlayAlpha = 0.2): void {
        if (mesh) {
            mesh.renderOverlay = status;
            mesh.overlayColor = WHITE;
            mesh.overlayAlpha = overlayAlpha;
        }
    }

    private getLevelIndexByMesh(mesh: AbstractMesh): number {
        const index = LEVELS.findIndex(chapter => chapter.meshes.includes(mesh.name));
        return index >= 0 ? index : -1;
    }

    private moveAllMeshes(direction: "right" | "left"): void {
        this._scene.meshes.forEach(mesh => moveMeshTo(mesh, new Vector3(0, 0, direction === "left" ? 7 : 0), 150));
    }

    //#endregion
}
