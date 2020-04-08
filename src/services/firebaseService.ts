import * as firebase from "firebase/app";
import "firebase/auth";
import {FirebaseError} from "firebase";
import {TResponse, TResponseCode} from "../types/TResponse";

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

export const initializeFirebaseApp = () => firebase.initializeApp(firebaseConfig);

export const loginUserWithEmailAndPassword: (email: string, password: string) => Promise<TResponse> = (email: string, password: string) => {
    return firebase
        .auth()
        .setPersistence(Persistence.SESSION)
        .then(() => {
            return firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    const response: TResponse = {
                        type: TResponseCode.LOGIN_OK,
                        errors: [],
                        data: null
                    };
                    return response;
                })
                .catch((error: FirebaseError) => {
                    console.log(error);

                    const response: TResponse = {
                        type: TResponseCode.LOGIN_ERROR,
                        errors: [error.message],
                        data: null
                    };
                    return response;
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
                .then(() => {
                    const response: TResponse = {
                        type: TResponseCode.REGISTRATION_OK,
                        errors: [],
                        data: null
                    };
                    return response;
                })
                .catch((error: FirebaseError) => {
                    console.log(error);

                    const response: TResponse = {
                        type: TResponseCode.REGISTRATION_ERROR,
                        errors: [error.message],
                        data: null
                    };
                    return response;
                })
        });
};
