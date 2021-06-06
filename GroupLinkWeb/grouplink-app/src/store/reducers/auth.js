const initialState = {
  isAuth: false,
  token: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "logIn":
      return {isAuth: true, token: payload.token}
    case "logOut":
      return  {isAuth: false, token: null}
    default:
      return state;
  }
};
