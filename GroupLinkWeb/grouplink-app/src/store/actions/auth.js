export const logIn = (token) => {
    return {
        type: "logIn",
        payload: {token}
    }
}

export const logOut = () => {
    return {
        type: "logOut"
    }
}
