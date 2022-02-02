import { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($username: String!) {
    changeUsername(username: $username) {
      username
    }
  }
`
const TAKEN_MSG = 'has already been taken'

export function useUsernameChange () {
  const [username, setUsername] = useState()
  const [usernameError, setUsernameError] = useState()
  const [mutate, { loading }] = useMutation(CHANGE_USERNAME_MUTATION)

  function checkUsername (username) {
    let error = undefined
    if (!username || username.length < 3) {
      error = 'Username should be at least 3 characters long'
    } else if (username[0] === '@') {
      error = '@ is not allowed for the first character'
    }
    setUsernameError(error)
    return error
  }

  function catchUsernameChangeError (e) {
    let error = 'Something went wrong, please try again later'
    if (e.graphQLErrors) {
      const { details, message } = e.graphQLErrors[0]
      error = message
      if (details.username && details.username.includes(TAKEN_MSG)) {
        error = `Username "${username}" is already teaken`
      }
    }
    setUsernameError(error)
  }

  const changeUsername = username =>
    mutate({
      variables: {
        username
      }
    })

  return {
    changeUsername,
    savingUsername: loading,
    usernameError,
    setUsernameError,
    username,
    setUsername,
    checkUsername,
    catchUsernameChangeError
  }
}
