import React, {FC, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import firebase, {User} from "firebase/app";
import {Grommet} from "grommet";

import './styles/index.css';
import {theme} from "./styles/theme";

import {unregisterServiceWorker} from "./services/serviceWorkerService";
import {initializeFirebaseApp} from "./services/firebaseService";

import LoadingScreen from "./pages/LoadingScreen";
import LoginPage from "./pages/Login";

import LayoutComponent from "./components/LayoutComponent";

const LOADING_DURATION = 2500;

// ===================================================
initializeFirebaseApp();

// ===================================================
const App: FC = () => {
    const [state, setState] = useState<"idle" | "loading">("idle");
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    firebase.auth().onAuthStateChanged((user: User | null) => {
        if (user && !authenticated) {
            setAuthenticated(true);
            showLoadingScreen(LOADING_DURATION);
        }

        if (!user && authenticated) {
            setAuthenticated(false);
            showLoadingScreen(LOADING_DURATION);
        }
    });

    const showLoadingScreen = useCallback((duration: number) => {
        setState("loading");
        setTimeout(() => setState("idle"), duration);
    }, []);

    return (
        <Grommet theme={theme} full>
            <LayoutComponent>
                {state === "loading" && <LoadingScreen/>}

                {authenticated ? <div/> : <LoginPage/>}
            </LayoutComponent>
        </Grommet>
    )
};

// ===================================================
ReactDOM.render(<App/>, document.getElementById('root'));
unregisterServiceWorker();
