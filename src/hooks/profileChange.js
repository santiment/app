import { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { store } from '../redux'
import { showNotification } from '../actions/rootActions'

const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($username: String!) {
    changeUsername(username: $username) {
      username
    }
  }
`

const CHANGE_NAME_MUTATION = gql`
  mutation changeName($fullname: String!) {
    changeName(name: $fullname) {
      name
    }
  }
`

const TAKEN_MSG = 'has already been taken'

export function useUsernameChange (_username) {
  const [username, setUsername] = useState(_username)
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

  const showUsernameChangedNotifiction = (notification = null) => {
    if (notification) {
      store.dispatch(showNotification(notification))
    } else {
      store.dispatch(
        showNotification(`Username successfully changed to "${username}"`)
      )
    }
  }

  return {
    changeUsername,
    savingUsername: loading,
    usernameError,
    setUsernameError,
    username,
    setUsername,
    checkUsername,
    catchUsernameChangeError,
    showUsernameChangedNotifiction
  }
}

export function useFullnameChange (_fullname) {
  const [fullname, setFullname] = useState(_fullname)
  const [fullnameError, setFullnameError] = useState()
  const [mutate, { loading }] = useMutation(CHANGE_NAME_MUTATION)

  function checkFullname (fullname) {
    let error = undefined
    if (fullname && fullname.length < 3) {
      error = 'Full name should be at least 3 characters long'
    }
    setFullnameError(error)
    return error
  }

  function catchFullnameChangeError (e) {
    let error = 'Something went wrong, please try again later'
    if (e.graphQLErrors) {
      const { message } = e.graphQLErrors[0]
      error = message
    }
    setFullnameError(error)
  }

  const changeFullname = fullname =>
    mutate({
      variables: {
        fullname
      }
    })

  const showFullnameChangedNotifiction = (notification = null, _fullname) => {
    if (notification) {
      store.dispatch(showNotification(notification))
    } else {
      store.dispatch(
        showNotification(
          `Full name successfully changed to "${_fullname || fullname}"`
        )
      )
    }
  }

  return {
    fullname,
    setFullname,
    fullnameError,
    setFullnameError,
    checkFullname,
    catchFullnameChangeError,
    changeFullname,
    showFullnameChangedNotifiction,
    savingFullname: loading
  }
}
