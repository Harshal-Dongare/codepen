import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { Menus, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useState } from "react";
import { slideUpOut } from "../animations";

const UserProfileDetails = () => {
    // get all the user data from the redux store to display info
    const user = useSelector((state) => state.user?.user);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        // user profile Info section
        <div className="flex items-center justify-center gap-4 relative">
            {/* user profile image section */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer bg-emerald-500">
                {user?.photoURL ? (
                    //if user has profile picture
                    <>
                        <motion.img
                            whileHover={{ scale: 1.2 }}
                            src={user?.photoURL}
                            alt={user?.displayName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                        />
                    </>
                ) : (
                    // if user does not have profile picture
                    <p className="text-2xl text-white font-semibold capitalize">
                        {user.email[0]}
                    </p>
                )}
            </div>

            {/* Account info drop down list section*/}
            {/* drop down icon */}
            <motion.div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
            >
                <FaChevronDown className="text-primaryText text-sm" />
            </motion.div>

            {/* user profile details drop down list */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        {...slideUpOut}
                        className="bg-secondary absolute top-14 right-0 px-4 py-3 rounded-md shadow-md z-10 flex flex-col items-start justify-start gap-3 min-w-[225px]"
                    >
                        {/* Menu items */}
                        {Menus &&
                            Menus.map((menu) => (
                                <Link
                                    to={menu.uri}
                                    key={menu.id}
                                    className="text-primaryText hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                                >
                                    {menu.name}
                                </Link>
                            ))}

                        {/* Sign Out button */}
                        <motion.p
                            onClick={signOutAction}
                            whileTap={{ scale: 0.9 }}
                            className="text-primaryText hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
                        >
                            Sign Out
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserProfileDetails;
