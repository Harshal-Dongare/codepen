// action to set Projects in the redux store
export const SET_PROJECTS = (projects) => {
    return {
        type: "SET_PROJECTS",
        projects: projects,
    };
};

// action to remove projects from the redux store
export const SET_PROJECTS_NULL = () => {
    return {
        type: "SET_PROJECTS_NULL",
    };
};
