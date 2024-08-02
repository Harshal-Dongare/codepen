import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const UserAuthInput = ({
    label,
    placeholder,
    isPass,
    setStateFunction,
    Icon,
    setGetEmailValidationStatus,
}) => {
    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(false);

    // state to change border color to red when email is invalid
    const [isEmailValid, setEmailValid] = useState(false);

    const handleTextChange = (e) => {
        setValue(e.target.value);
        setStateFunction(e.target.value);

        // check if email is valid
        if (placeholder === "Email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegex.test(value);
            setEmailValid(status);

            // send email validation status so that we can show error to the user
            setGetEmailValidationStatus(status);
        }
    };

    return (
        <div className="flex flex-col items-start justify-start gap-1">
            {/* label field */}
            <label className="text-xs text-gray-300">{label}</label>
            <div
                className={`flex items-center justify-center gap-3 w-full md:w-80 rounded-md px-4 py-1 text-sm bg-gray-200 ${
                    !isEmailValid &&
                    placeholder === "Email" &&
                    value.length > 0 &&
                    "border-2 border-red-500"
                }`}
            >
                {/* input field icon */}
                <Icon className="text-text555 text-xl" />
                {/* input field */}
                <input
                    type={isPass && showPass ? "password" : "text"}
                    placeholder={placeholder}
                    className="flex-1 w-full h-full py-1 outline-none border-none bg-transparent text-text555 text-sm"
                    value={value}
                    onChange={handleTextChange}
                />

                {/* show password eye icon */}
                {isPass && (
                    <motion.div
                        onClick={() => setShowPass(!showPass)}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                    >
                        {/* toggle password eye icon */}
                        {showPass ? (
                            <FaEyeSlash className="text-text555 text-xl" />
                        ) : (
                            <FaEye className="text-text555 text-xl" />
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UserAuthInput;
