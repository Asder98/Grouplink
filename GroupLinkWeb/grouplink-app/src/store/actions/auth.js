export const logIn = (token, login, idUser) => {
    return {
        type: "logIn",
        payload: {token, login, idUser}
    }
}

export const logOut = () => {
    return {
        type: "logOut"
    }
}
