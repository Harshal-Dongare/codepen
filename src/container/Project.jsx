import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import { useEffect, useState } from "react";

const Project = () => {
    const projects = useSelector((state) => state.projects?.projects);
    const searchTerm = useSelector((state) =>
        state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
    );
    const [filtered, setFiltered] = useState(null);

    // filter projects based on search term
    useEffect(() => {
        if (searchTerm?.length > 0) {
            setFiltered(
                projects?.filter((project) => {
                    const lowerCaseItem = project?.title.toLowerCase();
                    return searchTerm
                        .split("")
                        .every((letter) => lowerCaseItem.includes(letter));
                })
            );
        } else {
            setFiltered(null);
        }
    }, [searchTerm]);

    return (
        <div className="w-full py-6 flex items-center justify-center gap-4 flex-wrap">
            {filtered ? (
                <>
                    {filtered &&
                        filtered.map((project, index) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            );
                        })}
                </>
            ) : (
                <>
                    {projects &&
                        projects.map((project, index) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            );
                        })}
                </>
            )}
        </div>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full cursor-pointer md:w-[330px] h-[280px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4"
        >
            {/* Thumbnail of the output */}
            <div
                className="bg-primary w-full h-full rounded-md overflow-hidden"
                style={{ overflow: "hidden", height: "100%" }}
            >
                <iframe
                    title="Result"
                    srcDoc={project.output}
                    style={{
                        border: "none",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>

            {/* User Details */}
            <div className="flex items-center justify-start gap-3 w-full">
                {/* Profile image of the user*/}
                <div className="w-10 h-10 flex items-center justify-center rounded-xl  overflow-hidden cursor-pointer bg-emerald-500">
                    {project?.user?.photoURL ? (
                        <motion.img
                            whileHover={{ scale: 1.2 }}
                            src={project?.user?.photoURL}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                        ></motion.img>
                    ) : (
                        <p className="text-sm text-white font-semibold capitalize"></p>
                    )}
                </div>

                {/* name */}
                <div>
                    {/* Project title */}
                    <p className="text-white text-md capitalize">
                        {project?.title}
                    </p>

                    {/* Name of the user */}
                    <p className="text-primaryText text-xs capitalize">
                        {project?.user?.displayName
                            ? project?.user.displayName
                            : `${project?.user?.email.split("@")[0]}`}
                    </p>
                </div>

                {/* User Collections Icon */}
                <motion.div
                    className="cursor-pointer ml-auto"
                    whileTap={{ scale: 0.9 }}
                >
                    <MdBookmark className="text-primaryText text-xl" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Project;
