import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import firebase, {User} from "firebase/app";
import {Grommet} from "grommet";

import './styles/index.css';
import {theme} from "./styles/theme";

import {unregisterServiceWorker} from "./services/serviceWorkerService";
import {initializeFirebaseApp} from "./services/firebaseService";

import LoginPage from "./pages/Login";

import LayoutComponent from "./components/LayoutComponent";

// ===================================================
initializeFirebaseApp();

// ===================================================
const App: FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    firebase.auth().onAuthStateChanged((user: User | null) => {
        if (user && !authenticated) setAuthenticated(true);
        else if (!user && authenticated) setAuthenticated(false);
    });

    return (
        <Grommet theme={theme} full>
            <LayoutComponent>
                {/* TODO: Loading Screen */}

                {authenticated ? <div/> : <LoginPage/>}
            </LayoutComponent>
        </Grommet>
    )
};

// ===================================================
ReactDOM.render(<App/>, document.getElementById('root'));
unregisterServiceWorker();
