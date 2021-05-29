import createDataContext from "./createDataContext"

const authReducer = (prevState, action) => {}

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
  { signIn, signOut },
  { token: null, username: "" }
)
