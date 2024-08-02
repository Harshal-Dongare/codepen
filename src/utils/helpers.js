import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

//  It tells Firebase that you want to use Google for signing in users.
const googleProvider = new GoogleAuthProvider();

// Handles the Google Sign in process
export const signInWithGoogle = async () => {
    // triggers the sign-in process and return user credentials if the sign-in is successful
    await signInWithPopup(auth, googleProvider).then((userCred) => {
        window.location.reload();
    });
};

//  It tells Firebase that you want to use Github for signing in users.
const githubProvider = new GithubAuthProvider();

// Handles the GitHub Sign in process
export const signInWithGitHub = async () => {
    // triggers the sign-in process and return user credentials if the sign-in is successful
    await signInWithPopup(auth, githubProvider).then((userCred) => {
        window.location.reload();
    });
};

// Menu Items for the profile dropdown list
export const Menus = [
    { id: uuidv4(), name: "Projects", uri: "/home/projects" },
    { id: uuidv4(), name: "Collections", uri: "/home/collection" },
    { id: uuidv4(), name: "Profile", uri: "/home/profile" },
];

// Sign Out Action
export const signOutAction = async () => {
    await auth.signOut().then(() => {
        window.location.reload();
    });
};
