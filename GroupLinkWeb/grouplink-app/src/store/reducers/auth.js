const initialState = {
  isAuth: false,
  token: null,
  login: null,
  userId: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "logIn":
      return {isAuth: true, token: payload.token, login: payload.login, userId: payload.idUser}
    case "logOut":
      return  {isAuth: false, token: null, login: null, userId: null}
    default:
      return state;
  }
};