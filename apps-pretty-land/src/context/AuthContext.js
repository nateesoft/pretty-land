import createDataContext from "./createDataContext"

const authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      }
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      }
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      }
    default:
      return prevState
  }
}

const signUp = (dispatch) => {
  return ({ email, password }) => {
    dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
  }
}

const signIn = (dispatch) => {
  return ({ username, password }) => {
    dispatch({
      type: "SIGN_IN",
      payload: {
        token: "dummy-auth-token",
      },
    })
  }
}

const signOut = (dispatch) => {
  return () => {
    dispatch({ type: "SIGN_OUT" })
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp },
  { token: null, username: "" }
)
