import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home, NewProject } from "./container";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase.config";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import { SET_PROJECTS } from "./context/actions/projectActions";
const App = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // Set up a listener for getting the user's login information from the firestore
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            // If a user is authenticated, get the user's data
            if (userCred) {
                // Push the user data to the firestore, then after successful push set data in the redux store as well
                setDoc(
                    doc(db, "users", userCred?.uid),
                    userCred?.providerData[0]
                ).then(() => {
                    // dispatch the action to store
                    dispatch(SET_USER(userCred?.providerData[0]));

                    // navigate to home
                    navigate("/home/projects", { replace: true });
                });
            } else {
                // If no user is authenticated, navigate to the authentication page
                navigate("/home/auth", { replace: true });
            }

            // Hide the loading spinner once the user is authenticated and user data is stored in the redux store
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, []);

    // set up listener to get all the projects from the firestore
    useEffect(() => {
        const projectQuery = query(
            collection(db, "Projects"),
            orderBy("id", "desc")
        );

        const unsubscribe = onSnapshot(projectQuery, (querySnaps) => {
            const projectsList = querySnaps.docs.map((doc) => doc.data());
            dispatch(SET_PROJECTS(projectsList));
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
                    <Spinner />
                </div>
            ) : (
                <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
                    <Routes>
                        <Route path="/home/*" element={<Home />} />
                        <Route path="/newProject" element={<NewProject />} />

                        {/* If the route is not matching, redirect to home by default */}
                        <Route path="*" element={<Navigate to="/home" />} />
                    </Routes>
                </div>
            )}
        </>
    );
};

export default App;
