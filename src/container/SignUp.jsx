import { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithGitHub, signInWithGoogle } from "../utils/helpers";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [getEmailValidationStatus, setGetEmailValidationStatus] =
        useState(false);

    // state to toggle between login and sign up button
    const [isLogin, setIsLogin] = useState(false);

    // state to show the alert message for invalid credintials
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    // handle sign up using email and password
    const createNewUser = async () => {
        // if email input is valid
        if (getEmailValidationStatus) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    if (userCred) {
                        console.log(userCred);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    // handle login using email and password for already registered user
    const loginWithEmailPassword = async () => {
        if (getEmailValidationStatus) {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    if (userCred) {
                        console.log(userCred);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // if the error is due to invalid credentials
                    if (err.message.includes("invalid-credential")) {
                        setAlert(true);
                        setAlertMessage("Invalid id: User not found");
                    }
                    // if the error is due to missing password
                    else if (err.message.includes("missing-password")) {
                        setAlert(true);
                        setAlertMessage("Missing Password Field");
                    }
                    // if the error is due to many failed login attempts
                    else {
                        setAlert(true);
                        setAlertMessage(
                            "Temporarily disabled: Many failed login attempts."
                        );
                    }

                    // hide the alert message after 3 seconds
                    setTimeout(() => {
                        setAlert(false);
                    }, 4000);
                });
        }
    };

    return (
        <div className="w-full py-6 ">
            {/* logo */}
            <img
                src={Logo}
                alt="logo"
                className="object-contain opacity-50 w-24 h-auto"
            />

            <div className="w-full flex flex-col items-center justify-center py-4">
                {/* title */}
                <p className="py-6 text-md text-primaryText">
                    Join With Us! 🤩
                </p>

                {/* Sign in form */}
                <div className="px-6 w-full md:w-auto py-3 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-4">
                    {/* email field */}
                    <UserAuthInput
                        label={"Email"}
                        placeholder={"Email"}
                        isPass={false}
                        key={"Email"}
                        setStateFunction={setEmail}
                        Icon={FaEnvelope}
                        setGetEmailValidationStatus={
                            setGetEmailValidationStatus
                        }
                    />

                    {/* password field */}
                    <UserAuthInput
                        label={"Password"}
                        placeholder={"Password"}
                        isPass={true}
                        key={"Password"}
                        setStateFunction={setPassword}
                        Icon={MdPassword}
                    />

                    {/* alert section for invalid credentials for registered users */}
                    <AnimatePresence>
                        {alert && (
                            <motion.p
                                key={"AlertMessage"}
                                {...fadeInOut}
                                className="text-red-500 text-xs"
                            >
                                {alertMessage}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* login / signup button */}
                    {!isLogin ? (
                        // if the user is not registered, show Signup button
                        <motion.div
                            onClick={createNewUser}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center bg-emerald-500 w-full py-2 rounded-md cursor-pointer hover:bg-emerald-700"
                        >
                            <p className="text-white text-sm">Sign Up</p>
                        </motion.div>
                    ) : (
                        // if the user is logged in, show login button
                        <motion.div
                            onClick={loginWithEmailPassword}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center bg-emerald-500 w-full py-2 rounded-md cursor-pointer hover:bg-emerald-700"
                        >
                            <p className="text-white text-sm">Login</p>
                        </motion.div>
                    )}

                    {/* sign up link / login link text */}
                    {!isLogin ? (
                        <p className="text-xs text text-primaryText flex items-center justify-center gap-3">
                            Already Have an account?{" "}
                            <span
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-emerald-500 cursor-pointer"
                            >
                                Login Here
                            </span>
                        </p>
                    ) : (
                        <p className="text-xs text text-primaryText flex items-center justify-center gap-3">
                            Doesn't have an account{" "}
                            <span
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-emerald-500 cursor-pointer"
                            >
                                Create Here
                            </span>
                        </p>
                    )}

                    {/* OR divider */}
                    <div className="flex items-center justify-center gap-6">
                        <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                        <p className="text-xs text-[rgba(256,256,256,0.2)]">
                            OR
                        </p>
                        <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                    </div>

                    {/* Google sign in button */}
                    <motion.div
                        onClick={signInWithGoogle}
                        className="flex gap-4 items-center justify-center bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-2 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                    >
                        {/* Google Icon */}
                        <FcGoogle className="text-2xl" />
                        <p className="text-sm text-white">
                            Sign in with Google
                        </p>
                    </motion.div>

                    {/* OR divider */}
                    <div className="flex items-center justify-center gap-6">
                        <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                        <p className="text-xs text-[rgba(256,256,256,0.2)]">
                            OR
                        </p>
                        <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                    </div>

                    {/* GitHub sign in button */}
                    <motion.div
                        onClick={signInWithGitHub}
                        className="flex gap-4 items-center justify-center bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-2 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                    >
                        {/* Github Icon */}
                        <FaGithub className="text-2xl text-white" />
                        <p className="text-sm text-white">
                            Sign in with Github
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
