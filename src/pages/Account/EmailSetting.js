import React from 'react'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { store } from '../../index'
import { showNotification } from '../../actions/rootActions'
import EditableInputSetting from './EditableInputSetting'
import * as actions from '../../actions/types'
import { connect } from 'react-redux'

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

const EmailSetting = ({
  email,
  dispatchNewEmail,
  changeEmail,
  hideIfEmail = false
}) => {
  const show = !hideIfEmail || (hideIfEmail && email)

  return (
    show && (
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
  )
}

const mapStateToProps = ({ user: { data: { email } = {} } }) => ({
  email
})

const mapDispatchToProps = dispatch => ({
  dispatchNewEmail: email =>
    dispatch({
      type: actions.USER_EMAIL_CHANGE,
      email
    })
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(CHANGE_EMAIL_MUTATION, { name: 'changeEmail' })
)

export default enhance(EmailSetting)
