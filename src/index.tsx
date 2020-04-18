import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import firebase, {User} from "firebase/app";
import {Grommet} from "grommet";

import './styles/index.css';
import {theme} from "./styles/theme";

import UserContext from "./contexts/UserContext";
import LoadingContext from "./contexts/LoadingContext";

import {unregisterServiceWorker} from "./services/ServiceWorkerService";
import {initializeFirebaseApp} from "./services/FirebaseService";

import LoadingScreenPage from "./pages/LoadingScreen";
import LoginPage from "./pages/Login";
import GameMasterPage from "./pages/GameMaster";

import LayoutComponent from "./components/LayoutComponent";

// ===================================================
initializeFirebaseApp();

// ===================================================
const App: FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    firebase.auth().onAuthStateChanged((user: User | null) => {
        if (user && !authenticated) setAuthenticated(true);
        if (!user && authenticated) setAuthenticated(false);
    });

    const showLoadingScreen = (duration: number) => {
        setLoading(true);
        setTimeout(() => setLoading(false), duration);
    }

    return (
        <Grommet theme={theme} full>
            <UserContext.Provider value={{
                user: null,
                logout: () => firebase.auth().signOut()
            }}>
                <LoadingContext.Provider value={{
                    showLoadingScreenForDuration: (duration: number) => showLoadingScreen(duration)
                }}>
                    {/* Loading Screen */}
                    {loading && <LoadingScreenPage/>}

                    {/* Content */}
                    <LayoutComponent>
                        {!authenticated && <LoginPage/>}
                        {authenticated && <GameMasterPage/>}
                    </LayoutComponent>
                </LoadingContext.Provider>
            </UserContext.Provider>
        </Grommet>
    )
};

// ===================================================
ReactDOM.render(<App/>, document.getElementById('root'));
unregisterServiceWorker();
