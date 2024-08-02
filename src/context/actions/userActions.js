// action to set user data in the redux store
export const SET_USER = (user) => {
    return {
        type: "SET_USER",
        user: user,
    };
};

// action to remove user data from the redux store
export const SET_USER_NULL = () => {
    return {
        type: "SET_USER_NULL",
    };
};
