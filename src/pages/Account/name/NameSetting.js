import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { store } from '../../../redux'
import { showNotification } from '../../../actions/rootActions'
import EditableInputSetting from '../EditableInputSetting'
import styles from '../userName/UsernameSettings.module.scss'

const CHANGE_NAME_MUTATION = gql`
  mutation changeName($value: String!) {
    changeName(name: $value) {
      name
    }
  }
`

function validateName (name) {
  if (name && name.length < 3) {
    return 'Full name should be at least 3 characters long'
  }
}

const NameSetting = ({ dispatchNewName, name, changeName }) => {
  return (
    <EditableInputSetting
      label='Full name'
      defaultValue={name}
      validate={validateName}
      classes={styles}
      onSubmit={value =>
        changeName({ variables: { value } })
          .then(() => {
            store.dispatch(
              showNotification(`Full name successfully changed to "${value}"`)
            )
            dispatchNewName(value)
          })
          .catch(() => {
            store.dispatch(
              showNotification({
                variant: 'error',
                title: `Oops! Something went wrong, please try again`
              })
            )
          })
      }
    />
  )
}

export default graphql(CHANGE_NAME_MUTATION, { name: 'changeName' })(
  NameSetting
)
