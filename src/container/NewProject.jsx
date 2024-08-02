import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";

// react-split-pane component
import SplitPane from "react-split-pane";

// CodeMirror components for code editor
import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";

// for line wrapping in the code editor
import { EditorView } from "@codemirror/view";

// CodeMirror extensions for languages
import { langs } from "@uiw/codemirror-extensions-langs";

// CodeMirror theme
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { useEffect, useState } from "react";
import { Logo } from "../assets";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Alert, UserProfileDetails } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const NewProject = () => {
    // states for code editor to store code
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");

    // states for output screen
    const [output, setOutput] = useState("");

    const [title, setTitle] = useState("Untitled");

    // state to toggle between edit the title and show the title after save
    const [isTitle, setIsTitle] = useState("");

    // state to throw alert messages after saving the project
    const [alert, setAlert] = useState(false);

    // Fetch user details from redux store
    const user = useSelector((state) => state.user?.user);

    useEffect(() => {
        updateOutput();
    }, [html, css, js]);

    // function to update output
    const updateOutput = () => {
        //
        const combinedOutput = `
            <html>
                <head>
                    <style>${css}</style>
                </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;
        setOutput(combinedOutput);
    };

    // function to save the project to the firebase
    const saveProject = async () => {
        const id = `${Date.now()}`;
        const _doc = {
            id: id,
            title: title,
            html: html,
            css: css,
            js: js,
            output: output,
            user: user,
        };
        // store the project in firebase
        await setDoc(doc(db, "Projects", id), _doc)
            .then((res) => {
                // change the alert state to true
                setAlert(true);
            })
            .catch((err) => console.log(err));

        // hide the alert after 3 seconds
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    };
    return (
        <>
            {/* Editor container */}
            <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
                {/* alert section after successful save */}
                <AnimatePresence>
                    {alert && (
                        <Alert
                            status={"Success"}
                            alertMsg={"Project Saved..."}
                        />
                    )}
                </AnimatePresence>

                {/* Header Section above the code editor */}
                <header className="w-full flex items-center justify-between px-12 py-4">
                    {/* Left side of the header */}
                    <div className="flex items-center justify-center gap-6">
                        {/* logo */}
                        <Link to={"/home/projects"}>
                            <img
                                src={Logo}
                                alt="logo"
                                className="object-contain w-28 h-auto"
                            />
                        </Link>
                        {/* Title Section */}
                        <div className="flex flex-col items-start justify-start">
                            {/* Title */}
                            <div className="flex items-center justify-center gap-3">
                                <AnimatePresence>
                                    {isTitle ? (
                                        <>
                                            {/* Edit the project title */}
                                            <motion.input
                                                key={"TitleInput"}
                                                type="text"
                                                className="px-2 py-1 bg-transparent rounded-md text-primaryText text-sm outline-none border-none"
                                                placeholder="Your Title"
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {/* Show the title of the project after save */}
                                            <motion.p
                                                key={"TitleLabel"}
                                                className="px-3 py-2 text-white text-md"
                                            >
                                                {title}
                                            </motion.p>
                                        </>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isTitle ? (
                                        <>
                                            {/* Show check icon when input is active */}
                                            <motion.div
                                                key={"MdCheck"}
                                                whileTap={{ scale: 0.9 }}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setIsTitle(false)
                                                }
                                            >
                                                {/* Check icon */}
                                                <MdCheck className="text-xl text-emerald-500" />
                                            </motion.div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Show the edit icon when input is not active */}
                                            <motion.div
                                                key={"MdEdit"}
                                                whileTap={{ scale: 0.9 }}
                                                className="cursor-pointer"
                                                onClick={() => setIsTitle(true)}
                                            >
                                                {/* Edit icon */}
                                                <MdEdit className="text-xl text-primaryText" />
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* follow Section */}
                            <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                                {/* User name */}
                                <p className="text-primaryText text-xs">
                                    {user?.displayName
                                        ? user?.displayName
                                        : `${user?.email.split("@")[0]}`}
                                </p>
                                <motion.p
                                    whileTap={{ scale: 0.9 }}
                                    className="cursor-pointer text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold"
                                >
                                    + Follow
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {/* Right side of the header: User Section */}
                    {user && (
                        <div className="flex items-center justify-center gap-4">
                            {/* save button */}
                            <motion.button
                                onClick={saveProject}
                                whileTap={{ scale: 0.9 }}
                                className="px-4 py-1 bg-white cursor-pointer text-md text-primary font-semibold rounded-md"
                            >
                                Save
                            </motion.button>

                            {/* User Details */}
                            <UserProfileDetails />
                        </div>
                    )}
                </header>

                {/* Coding Editor */}
                <div>
                    {/* Horizontal splitter*/}
                    <SplitPane
                        split="horizontal"
                        minSize={100}
                        maxSize={-100}
                        defaultSize="50%"
                    >
                        {/* Top Coding Section Row */}
                        <SplitPane split="vertical" minSize={400}>
                            {/* HTML Editor */}
                            <div className="w-full h-full flex-col items-start justify-start">
                                {/* Header Section of HTML Editor */}
                                <div className="w-full flex items-center justify-between">
                                    {/* HTML Editor logo and Title */}
                                    <div className="bg-secondary px-2 py-1 border-t-4 border-t-gray-500 flex items-center justify-center gap-1">
                                        <FaHtml5 className="text-lg text-red-500" />
                                        <p className="text-sm text-primaryText font-semibold ">
                                            HTML
                                        </p>
                                    </div>

                                    {/* Settings Section */}
                                    <div className="cursor-pointer flex items-center justify-center gap-3 px-4">
                                        {/* Settings Icon */}
                                        <FcSettings className="text-sm" />

                                        {/* Dropdown Icon */}
                                        <FaChevronDown className="text-sm text-primaryText" />
                                    </div>
                                </div>

                                {/*  HTML Editor */}
                                <div className="w-full px-2">
                                    <CodeMirror
                                        value={html}
                                        height="600px"
                                        extensions={[
                                            langs.html(),
                                            // EditorView.lineWrapping,
                                        ]}
                                        theme={"dark"}
                                        onChange={(value, viewUpdate) => {
                                            setHtml(value);
                                        }}
                                    />
                                </div>
                            </div>

                            <SplitPane split="vertical" minSize={400}>
                                {/* CSS Editor Section*/}
                                <div className="w-full h-full flex-col items-start justify-start">
                                    {/* Header Section of CSS Editor */}
                                    <div className="w-full flex items-center justify-between">
                                        {/* CSS Editor logo and Title */}
                                        <div className="bg-secondary px-2 py-1 border-t-4 border-t-gray-500 flex items-center justify-center gap-1">
                                            <FaCss3 className="text-lg text-sky-500" />
                                            <p className="text-sm text-primaryText font-semibold ">
                                                CSS
                                            </p>
                                        </div>

                                        {/* Settings Section */}
                                        <div className="cursor-pointer flex items-center justify-center gap-3 px-4">
                                            {/* Settings Icon */}
                                            <FcSettings className="text-sm" />

                                            {/* Dropdown Icon */}
                                            <FaChevronDown className="text-sm text-primaryText" />
                                        </div>
                                    </div>

                                    {/* CSS Editor */}
                                    <div className="w-full px-2">
                                        <CodeMirror
                                            value={css}
                                            height="600px"
                                            extensions={[
                                                langs.css(),
                                                // EditorView.lineWrapping,
                                            ]}
                                            theme={"dark"}
                                            onChange={(value, viewUpdate) => {
                                                setCss(value);
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* JavaScript Editor Section*/}
                                <div className="w-full h-full flex-col items-start justify-start">
                                    {/* Header Section of JavaScript Editor */}
                                    <div className="w-full flex items-center justify-between">
                                        {/* JavaScript Editor logo and Title */}
                                        <div className="bg-secondary px-2 py-1 border-t-4 border-t-gray-500 flex items-center justify-center gap-1">
                                            <FaJs className="text-lg text-yellow-500" />
                                            <p className="text-sm text-primaryText font-semibold ">
                                                JS
                                            </p>
                                        </div>

                                        {/* Settings Section */}
                                        <div className="cursor-pointer flex items-center justify-center gap-3 px-4">
                                            {/* Settings Icon */}
                                            <FcSettings className="text-sm" />

                                            {/* Dropdown Icon */}
                                            <FaChevronDown className="text-sm text-primaryText" />
                                        </div>
                                    </div>

                                    {/* JavaScript Editor */}
                                    <div className="w-full px-2">
                                        <CodeMirror
                                            value={js}
                                            height="600px"
                                            extensions={[
                                                langs.javascript({ jsx: true }),
                                                // EditorView.lineWrapping,
                                            ]}
                                            theme={"dark"}
                                            onChange={(value, viewUpdate) => {
                                                setJs(value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </SplitPane>
                        </SplitPane>

                        {/* Bottom Output Section */}
                        <div
                            className="bg-white"
                            style={{ overflow: "hidden", height: "100%" }}
                        >
                            <iframe
                                title="Result"
                                srcDoc={output}
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                    </SplitPane>
                </div>
            </div>
        </>
    );
};

export default NewProject;
