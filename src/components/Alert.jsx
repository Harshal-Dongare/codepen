import { motion } from "framer-motion";
import { slideUpOut } from "../animations";

const Alert = ({ status, alertMsg }) => {
    return (
        <motion.div {...slideUpOut} className="fixed top-24 right-12 z-10">
            {status === "Success" && (
                <div className="bg-emerald-400 shadow-md shadow-emerald-500 py-2 px-4">
                    <p className="text-md text-primary">{alertMsg}</p>
                </div>
            )}

            {status === "Warning" && (
                <div className="bg-yellow-400 shadow-md shadow-yellow-500 py-2 px-4">
                    <p className="text-md text-primary">{alertMsg}</p>
                </div>
            )}

            {status === "Danger" && (
                <div className="bg-red-400 shadow-md shadow-red-500 py-2 px-4">
                    <p className="text-md text-primary">{alertMsg}</p>
                </div>
            )}
        </motion.div>
    );
};

export default Alert;
