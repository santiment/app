import { setContext } from 'apollo-link-context'
import { loadState } from './../utils/localStorage'

const AuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = loadState() ? loadState().token : undefined
  const authHeaders = token ? { authorization: `Bearer ${token}` } : {}

  return {
    headers: {
      ...headers,
      ...authHeaders
    }
  }
})

export default AuthLink
