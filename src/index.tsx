import React, {FC, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import firebase, {User} from "firebase/app";
import {Grommet} from "grommet";

import TPlayer from "./types/TPlayer";

import './styles/index.css';
import {theme} from "./styles/theme";

import PlayerContext from "./contexts/PlayerContext";
import LoadingContext from "./contexts/LoadingContext";

import {unregisterServiceWorker} from "./services/ServiceWorkerService";
import {initializeFirebaseApp, loadPlayerProfile, updatePlayerProfile} from "./services/FirebaseService";

import LoadingPage from "./pages/Loading";
import LoginPage from "./pages/Login";
import GameMasterPage from "./pages/GameMaster";

import LayoutComponent from "./components/LayoutComponent";

// ===================================================
initializeFirebaseApp();

// ===================================================
const App: FC = () => {
    const [loadingScreen, showLoadingScreen] = useState<boolean>(true);
    const [playerProfile, setPlayerProfile] = useState<{ uid: string, player: TPlayer } | null>(null);

    const logout = useCallback(() => firebase.auth().signOut(), []);

    const updatePlayer = useCallback((newPlayer: TPlayer) => {
        if (playerProfile) {
            updatePlayerProfile(playerProfile.uid, newPlayer);
            setPlayerProfile({...playerProfile, player: newPlayer});
        }
    }, [playerProfile])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user: User | null) => {
            if (user && !playerProfile) {
                const response = await loadPlayerProfile(user.uid);
                if (response.data) {
                    setPlayerProfile({
                        uid: user.uid,
                        player: response.data as TPlayer
                    });
                }

                if (response.errors.length > 0) {
                    console.error("TODO: Implement Error Handling", response.errors);
                    logout();
                }
            } else if (!user && playerProfile) setPlayerProfile(null);
            else if (!user && !playerProfile) showLoadingScreen(false);
        });
    })

    return (
        <Grommet theme={theme} full>
            <PlayerContext.Provider value={{
                player: playerProfile ? playerProfile.player : null,
                update: updatePlayer,

                logout: logout
            }}>
                <LoadingContext.Provider value={{
                    toggleLoadingScreen: showLoadingScreen
                }}>
                    {/* Loading Screen */}
                    {loadingScreen && <LoadingPage/>}

                    {/* Content */}
                    <LayoutComponent>
                        {!playerProfile && <LoginPage/>}
                        {playerProfile && <GameMasterPage/>}
                    </LayoutComponent>
                </LoadingContext.Provider>
            </PlayerContext.Provider>
        </Grommet>
    )
};

// ===================================================
ReactDOM.render(<App/>, document.getElementById('root'));
unregisterServiceWorker();
