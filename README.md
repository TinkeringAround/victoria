![Victoria Logo](./src/assets/logo/logo.png)


[![Netlify Status](https://api.netlify.com/api/v1/badges/ea1bd5a2-d19b-4e16-9497-382a500a5174/deploy-status)](https://app.netlify.com/sites/tinkeringaround-victoria/deploys)

**Victoria** is a Web-based Game using [ReactJS](https://reactjs.org/) and [BabylonJS](https://www.babylonjs.com/).
The 3D Meshes are created in [Blender](https://www.blender.org/) and exported to BabylonJS Engine via [Blender-To-Babylon-Exporter](https://doc.babylonjs.com/resources/blender).

## 1. Setup

For running the Application locally, you need the following in the directory or installed on your machine:
-[ ] *.env* File with Firebase settings
-[ ] [NodeJS](https://nodejs.org/en/download/) installed locally
-[ ] [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed locally

In the Project folder run `yarn` to installs all necessary `node_modules` which are required by the application.
Afterwards run `yarn start` to start the application in development mode. Visit [http://localhost:3000](http://localhost:3000) to test the application.

## 2. Available Scripts

In the project directory, you can run in the Terminal of your choice:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

