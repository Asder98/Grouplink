export default (state = false, { type, payload }) => {
    switch (type) {
        case "showLogIn":
            return false
        case "showSignIn":
            return  true
        default:
            return state;
    }
};
