import createDataContext from "./createDataContext"

const authReducer = (prevState, action) => {}

export const { Provider, Context } = createDataContext(authReducer, {
  token: null,
  username: "",
})
