import React, {FC, useEffect, useState} from 'react';
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
    const [authenticated, setAuthenticated] = useState<boolean>();
    const [loadingScreen, showLoadingScreen] = useState<boolean>(true);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: User | null) => {
            if (user && !authenticated) setAuthenticated(true);
            else if (!user && authenticated) setAuthenticated(false);
            else if (!user && !authenticated) showLoadingScreen(false);
        });
    })

    return (
        <Grommet theme={theme} full>
            <UserContext.Provider value={{
                user: null,
                logout: () => firebase.auth().signOut()
            }}>
                <LoadingContext.Provider value={{
                    toggleLoadingScreen: showLoadingScreen
                }}>
                    {/* Loading Screen */}
                    {loadingScreen && <LoadingScreenPage/>}

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
