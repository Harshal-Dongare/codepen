import { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { Logo } from "../assets";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa";
import { Project, SignUp } from "../container";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";

const Home = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
    const dispatch = useDispatch();

    // fetch search term from redux store
    const searchTerm = useSelector((state) =>
        state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
    );

    // check if user is present in the redux store
    const user = useSelector((state) => state.user?.user);
    return (
        <>
            {/* left sidebar of the home page */}
            <div
                className={`w-2 ${
                    isSideMenuOpen ? "flex-[.1] xl:flex-[.15]" : "w-2"
                } min-h-screen max-h-screen relative bg-secondary px-4 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
            >
                {/* anchor: hide/show sidebar icon */}
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                    className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
                >
                    {/* chevron icon */}
                    <HiChevronDoubleLeft className="text-white text-xl" />
                </motion.div>

                {/* left side bar content */}
                <div className="overflow-hidden w-full flex flex-col gap-9">
                    {/* logo */}
                    <Link to={"/home"}>
                        <img
                            src={Logo}
                            alt="logo"
                            className="object-contain w-44 h-auto"
                        />
                    </Link>

                    {/* Start Coding option */}
                    <Link to={"/newProject"}>
                        <div className="px-6 py-2 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                            <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                                Start Coding
                            </p>
                        </div>
                    </Link>

                    {/* home nav */}
                    {user && (
                        <Link
                            to={"/home/projects"}
                            className="flex items-center justify-center gap-6"
                        >
                            <MdHome className="text-primaryText text-xl" />
                            <p className="text-lg text-primaryText">Home</p>
                        </Link>
                    )}
                </div>
            </div>

            {/* Right side of the Home page */}
            <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
                {/* top section of the right side */}
                <div className="w-full flex items-center justify-between gap-3">
                    {/* search bar section */}
                    <div className="bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3">
                        <FaSearchengin className="text-2xl text-primaryText" />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                dispatch(SET_SEARCH_TERM(e.target.value));
                            }}
                            type="text"
                            className="flex-1 px-4 text-md bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
                            placeholder="Search here..."
                        />
                    </div>

                    {/* profile icon section */}
                    {/* if user is not logged in; show sign up button which redirects to authentication page */}
                    {!user && (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center gap-3"
                        >
                            <Link
                                to={"/home/auth"}
                                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-md cursor-pointer hover:bg-emerald-700"
                            >
                                SignUp
                            </Link>
                        </motion.div>
                    )}

                    {/* if user is logged in show profile icon */}
                    {user && <UserProfileDetails />}
                </div>

                {/* bottom section of the right side */}
                <div className="w-full">
                    <Routes>
                        <Route path={"/*"} element={<Project />} />
                        <Route path={"/auth"} element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Home;
