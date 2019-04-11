import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { store } from '../../index'
import { showNotification } from '../../actions/rootActions'
import EditableInputSetting from './EditableInputSetting'

const TAKEN_MSG = 'Email has already been taken'

const CHANGE_EMAIL_MUTATION = gql`
  mutation changeEmail($value: String!) {
    changeEmail(email: $value) {
      success
    }
  }
`

const validateEmail = email => {
  if (!email) {
    return 'Email is required'
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'Invalid email address'
  }
}

const EmailSetting = ({ email, dispatchNewEmail, changeEmail }) => {
  return (
    <EditableInputSetting
      label='Email'
      defaultValue={email}
      validate={validateEmail}
      onSubmit={value =>
        changeEmail({ variables: { value } })
          .then(() => {
            store.dispatch(
              showNotification(`Verification email was sent to "${value}"`)
            )
            dispatchNewEmail(value)
          })
          .catch(error => {
            if (error.graphQLErrors[0].details.email.includes(TAKEN_MSG)) {
              store.dispatch(
                showNotification({
                  variant: 'error',
                  title: `Email "${value}" is already taken`
                })
              )
            }
          })
      }
    />
  )
}

export default graphql(CHANGE_EMAIL_MUTATION, { name: 'changeEmail' })(
  EmailSetting
)
