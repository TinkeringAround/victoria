import React, {FC, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import firebase, {User} from "firebase/app";
import {Grommet} from "grommet";

import TPlayer from "./types/TPlayer";
import TAudios from "./types/TAudios";

import './styles/index.css';
import {theme} from "./styles/theme";

import PlayerContext from "./contexts/PlayerContext";
import LoadingContext from "./contexts/LoadingContext";
import SoundContext from "./contexts/SoundContext";

import {unregisterServiceWorker} from "./services/ServiceWorkerService";
import {initializeFirebaseApp, loadPlayerProfile, updatePlayerProfile} from "./services/FirebaseService";
import {AUDIOS, load, pause, play} from "./services/SoundService";

import LoadingPage from "./pages/Loading";
import LoginPage from "./pages/Login";
import GameMasterPage from "./pages/GameMaster";
import SoundPage from "./pages/Sound";

import LayoutComponent from "./components/LayoutComponent";

// ===================================================
initializeFirebaseApp();

// ===================================================
const App: FC = () => {
    const [loadingScreen, showLoadingScreen] = useState<boolean>(true);
    const [playerProfile, setPlayerProfile] = useState<{ uid: string, player: TPlayer } | null>(null);
    const [audio] = useState<TAudios>(AUDIOS);
    const [muted, setMuted] = useState<boolean>(false);

    const logout = useCallback(() => firebase.auth().signOut(), []);
    const updatePlayer = useCallback((newPlayer: TPlayer) => {
        if (playerProfile) {
            updatePlayerProfile(playerProfile.uid, newPlayer);
            setPlayerProfile({...playerProfile, player: newPlayer});
        }
    }, [playerProfile])

    const muteSound = useCallback((mute: boolean = true) => {
        if (mute) pause(audio.background);
        else play(audio.background);

        setMuted(mute);
    }, [audio, muted])

    const pauseSound = useCallback(() => pause(audio.background), [audio]);
    const playSound = useCallback((soundName: string) => {
        if (!muted) play(audio.background, soundName).catch(() => setMuted(true));
        else load(audio.background, soundName);
    }, [audio, muted]);
    const playEffect = useCallback((effectName: string) => {
        // TODO: To Implement
    }, [audio])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user: User | null) => {
            if (user && !playerProfile) {
                const response = await loadPlayerProfile(user.uid);
                if (response.data) {
                    setPlayerProfile({uid: user.uid, player: response.data as TPlayer});
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
            <PlayerContext.Provider
                value={{player: playerProfile ? playerProfile.player : null, update: updatePlayer, logout: logout}}>
                <LoadingContext.Provider value={{toggleLoadingScreen: showLoadingScreen}}>
                    <SoundContext.Provider value={{muted: muted, mute: muteSound, play: playSound, pause: pauseSound}}>
                        {audio != null && <React.Fragment>
                            {/* Loading Screen */}
                            {loadingScreen && <LoadingPage/>}

                            {/* Sound Component */}
                            <SoundPage/>

                            {/* Content */}
                            <LayoutComponent>
                                {!playerProfile && <LoginPage/>}
                                {playerProfile && <GameMasterPage/>}
                            </LayoutComponent>
                        </React.Fragment>}
                    </SoundContext.Provider>
                </LoadingContext.Provider>
            </PlayerContext.Provider>
        </Grommet>
    )
};

// ===================================================
ReactDOM.render(<App/>, document.getElementById('root'));
unregisterServiceWorker();
