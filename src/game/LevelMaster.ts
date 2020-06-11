import {
    AbstractMesh,
    ActionManager,
    ArcRotateCamera,
    Engine,
    ExecuteCodeAction,
    HemisphericLight,
    IShadowLight,
    Nullable,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Vector3
} from 'babylonjs';

import TViewMode from "../types/TViewMode";
import {TLevel} from '../types/TLevel';

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

export default class LevelMaster {

    // CONSTS
    private LEVEL_ISLAND_NAME = "Island";
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
    private _viewMode: TViewMode = "detail";
    private _level: number = -1;

    private _activeRegion: string = "";
    private _activeLevel: number = -1;

    // Handler Attributes
    private _selectWorld: any;
    private _selectRegion: any;

    constructor(canvas: string, selectWorld: (worldIndex: number) => void, selectRegion: (regionName: string) => void) {
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

    //#region World Creation
    public createWorld(level: number): Promise<boolean> {
        return new Promise(async (resolve) => {
            this._level = level;

            // Camera
            moveCameraTargetTo(this._camera, new Vector3(LEVELS[level].meshes.basePosition.x, LEVELS[level].meshes.basePosition.y, LEVELS[level].meshes.basePosition.z));

            // Light and Shadow
            this.createLightAndShadowForLevel(level);

            // Meshes
            await this.loadAllMeshes(level);

            // Resolve
            console.log("Successfully Loaded All Meshes with Start Level " + level);
            resolve()
        })
    }

    private createLightAndShadowForLevel(level: number): void {
        this._lights = [];
        if (level === 0) {
            this._lights.push(
                createPointLight("white", new Vector3(-15, 25, 5), this._scene, WHITE, 6000, 60),
                createPointLight("red", new Vector3(-5, 5, 15), this._scene, RED, 3000, 25),
                createPointLight("blue", new Vector3(-5, 5, -10), this._scene, BLUE, 750, 20));
        }

        this._shadowGenerators.push(createShadowGeneratorFor(this._lights[0]));
    }

    private loadAllMeshes(currentLevel: number): Promise<unknown[]> {
        const promises = LEVELS.map((level: TLevel, index: number) => {
            return new Promise(async (resolve) => {
                await this.importSingleMeshes(level);
                await this.importMultiMeshes(level, index, currentLevel);
                resolve();
            });
        });

        return Promise.all(promises);
    }

    private importSingleMeshes(level: TLevel): Promise<unknown> {
        return new Promise((resolve) => {
            SceneLoader.ImportMesh("", getRootUrlFromAssetImport(level.meshes.single), getFileNameFromAssetImport(level.meshes.single), this._scene, (newMesh) => {
                newMesh.forEach(mesh => {
                    // Apply Mesh Position
                    mesh.position = new Vector3(level.meshes.basePosition.x, level.meshes.basePosition.y, level.meshes.basePosition.z);

                    // Actions Manager
                    mesh.actionManager = new ActionManager(this._scene);
                    this.createClickActionManagerInWorldMap(mesh);
                    this.createOverlayActionManagerInWorldMap(mesh);

                    // Apply Light to Mesh
                    this._backgroundLight.includedOnlyMeshes.push(mesh);
                    this._lights.forEach(light => light.includedOnlyMeshes.push(mesh));

                    // Disable Mesh
                    mesh.setEnabled(false);
                });

                resolve();
            });
        })
    }

    private importMultiMeshes(level: TLevel, index: number, currentLevel: number): Promise<unknown> {
        return new Promise(resolve => {
            SceneLoader.ImportMesh("", getRootUrlFromAssetImport(level.meshes.multi), getFileNameFromAssetImport(level.meshes.multi), this._scene, (newMesh) => {
                    newMesh.forEach(mesh => {
                            // Apply Mesh Position
                            mesh.position = new Vector3(level.meshes.basePosition.x, level.meshes.basePosition.y, level.meshes.basePosition.z);

                            if (index === currentLevel) {
                                // Actions Manager
                                mesh.actionManager = new ActionManager(this._scene);
                                if (LEVELS[currentLevel].meshes.regions.includes(mesh.name)) {
                                    this.createClickActionManagerInDetailMap(mesh);
                                    this.createOverlayActionManagerInDetailMap(mesh);
                                }

                                // Apply Light to Mesh
                                this._backgroundLight.includedOnlyMeshes.push(mesh);
                                this._lights.forEach(light => light.includedOnlyMeshes.push(mesh));

                                // Apply Shadow to Mesh
                                if (mesh.name.includes(this.LEVEL_ISLAND_NAME)) mesh.receiveShadows = true;
                                this._shadowGenerators.forEach(shadowGenerator => shadowGenerator?.getShadowMap()?.renderList?.push(mesh));
                            }
                        }
                    );

                    resolve();
                }
            );
        })
    }

    //#endregion

    //#region View Mode
    public setViewMode(mode: TViewMode): void {
        // Set View Mode
        this._viewMode = mode;
        const isWorldMap = mode === "world";
        const currentLevelMesh = this._scene.getMeshByName("Level" + this._level);

        // Camera
        this.setCameraViewMode(mode);

        // Toggle Multi and Single Meshes
        this.moveAllMeshes("right");
        LEVELS[this._level].meshes.all.forEach(meshName => {
            const mesh = this._scene.getMeshByName(meshName);
            if (mesh) {
                mesh.setEnabled(!isWorldMap);
                this.setOverlayForMesh(mesh, false);
            }
        });
        currentLevelMesh?.setEnabled(isWorldMap);
        if (!isWorldMap && currentLevelMesh) this.setOverlayForMesh(currentLevelMesh, false);

        // Reset Level
        if (isWorldMap) {
            this._activeLevel = -1;
            this._selectWorld(-1);
        }

        // Reset Region
        if (!isWorldMap) {
            this._activeRegion = "";
            this._selectRegion("");
        }
    }

    private setCameraViewMode(mode: TViewMode): void {
        const isWordMap = mode === "world";

        changeCameraAngleTo(this._camera, isWordMap ? Math.PI : 3, isWordMap ? 0 : 1.2, 60, isWordMap ? 100 : 35);
        lockCameraPosition(this._camera, this._canvas, isWordMap);
    }

    //#endregion

    //#region View = Details
    // Click
    private createClickActionManagerInDetailMap(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            () => {
                const currentlyActiveMesh = this.getMeshByName(this._activeRegion);
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
    private createOverlayActionManagerInDetailMap(mesh: AbstractMesh): void {
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
                    const levelIndex = this.getLevelIndexByLevelName(mesh.name);

                    if (levelIndex !== this._activeLevel) {
                        const currentlyActiveLevel = this.getMeshByName(mesh.name);
                        if (currentlyActiveLevel) currentlyActiveLevel.renderOverlay = false;

                        this.setOverlayForMesh(mesh, true, 0.4);
                        this._activeLevel = levelIndex;
                        this._selectWorld(levelIndex);
                    } else {
                        this.setOverlayForMesh(mesh, false);
                        this._activeLevel = -1;
                        this._selectWorld(-1);
                    }

                }
            }
        ));
    }

    private createOverlayActionManagerInWorldMap(mesh: AbstractMesh): void {
        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOverTrigger,
            () => {
                const levelIndex = this.getLevelIndexByLevelName(mesh.name);
                if (levelIndex !== this._activeLevel) this.setOverlayForMesh(this.getMeshByName(mesh.name), true, 0.1);
            }
        ));

        mesh.actionManager?.registerAction(new ExecuteCodeAction(
            ActionManager.OnPointerOutTrigger,
            () => {
                const levelIndex = this.getLevelIndexByLevelName(mesh.name);
                if (levelIndex !== this._activeLevel) this.setOverlayForMesh(this.getMeshByName(mesh.name), false);
            }
        ));
    }

    //#endregion

    //#region World Update
    public changeLevel(level: number): void {
        if (this._level !== level) {
            //TODO: Do something
        }
    }

    //#endregion

    //#region RenderLoop
    public doRender(): void {
        this._engine.runRenderLoop(() => this._scene.render());
        window.addEventListener('resize', () => {
            if (this._engine != null) {
                this._engine.resize();
            }
        });
    }

    public pauseRender(): void {
        this._engine.stopRenderLoop();
        window.removeEventListener("resize", () => {
            if (this._engine != null) {
                this._engine.resize();
            }
        });
    }

    //#endregion

    //#region Utilty
    private getMeshByName(meshName: string): Nullable<AbstractMesh> {
        return this._scene.getMeshByName(meshName)
    }

    private setOverlayForMesh(mesh: AbstractMesh | null, status: boolean, overlayAlpha = 0.2): void {
        if (mesh) {
            mesh.renderOverlay = status;
            mesh.overlayColor = WHITE;
            mesh.overlayAlpha = overlayAlpha;
        }
    }

    private getLevelIndexByLevelName(levelName: string): number {
        const char = levelName.charAt(levelName.length - 1);
        return Number.parseInt(char);
    }

    private moveAllMeshes(direction: "right" | "left"): void {
        this._scene.meshes.forEach(mesh => moveMeshTo(mesh, new Vector3(0, 0, direction === "left" ? 7 : 0), 250));
    }

    //#endregion
}
