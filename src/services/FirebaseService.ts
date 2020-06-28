import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {FirebaseError} from "firebase";

import {TResponse, TResponseCode} from "../types/TResponse";
import TPlayer from "../types/TPlayer";

const Persistence = firebase.auth.Auth.Persistence;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const createResponse: (type: TResponseCode, errors: Array<string>, data: any) => TResponse = (type, errors, data) => {
    const response: TResponse = {
        type: type,
        errors: errors,
        data: data
    };
    return response;
}

export const initializeFirebaseApp = () => firebase.initializeApp(firebaseConfig);

export const loginUserWithEmailAndPassword: (email: string, password: string) => Promise<TResponse> = (email: string, password: string) => {
    return firebase
        .auth()
        .setPersistence(Persistence.SESSION)
        .then(() => {
            return firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => createResponse(TResponseCode.LOGIN_OK, [], null))
                .catch((error: FirebaseError) => {
                    console.error(error);
                    return createResponse(TResponseCode.LOGIN_ERROR, [error.message], null);
                })
        });
};

export const registerUserWithEmailAndPassword: (email: string, password: string) => Promise<TResponse> = (email: string, password: string) => {
    return firebase
        .auth()
        .setPersistence(Persistence.SESSION)
        .then(() => {
            return firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => createResponse(TResponseCode.REGISTRATION_OK, [], null))
                .catch((error: FirebaseError) => {
                    console.error(error);
                    return createResponse(TResponseCode.REGISTRATION_ERROR, [error.message], null);
                });
        });
};


export const loadPlayerProfile: (uid: string) => Promise<TResponse> = (uid) => {
    return firebase.database()
        .ref("/" + uid)
        .once("value")
        .then(snapshot => createResponse(TResponseCode.DATABASE_OK, [], snapshot.val() as TPlayer))
        .catch((error: FirebaseError) => {
            console.error(error);
            return createResponse(TResponseCode.DATABASE_ERROR, [error.message], null);
        })
}

export const updatePlayerProfile: (uid: string, player: TPlayer) => Promise<TResponse> = (uid, player) => {
    const update = {
        [uid]: player
    }

    return firebase.database()
        .ref()
        .child(uid)
        .remove()
        .then(() =>
            firebase.database()
                .ref()
                .update(update)
                .then(() => createResponse(TResponseCode.DATABASE_OK, [], null))
                .catch((error: FirebaseError) => {
                    console.error(error);
                    return createResponse(TResponseCode.DATABASE_ERROR, [error.message], null);
                }))
        .catch((error: FirebaseError) => {
            console.error(error);
            return createResponse(TResponseCode.DATABASE_ERROR, [error.message], null);
        })
}
