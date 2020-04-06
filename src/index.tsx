import React, {FC, useState} from 'react';
import ReactDOM from 'react-dom';
import firebase, {User} from "firebase/app";

import './index.css';

import {unregisterServiceWorker} from "./services/serviceWorkerService";
import {initializeFirebaseApp} from "./services/firebaseService";

import {LoginPage} from "./pages/Login";

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
        <div>
            <LoginPage/>
        </div>
    )
};

// ===================================================
ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'));
unregisterServiceWorker();
