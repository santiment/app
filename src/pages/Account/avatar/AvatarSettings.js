import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import UserAvatar from './UserAvatar'
import ImageEditor from './editor/ImageEditor'
import styles from './AvatarSettings.module.scss'

const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($value: String!) {
    changeUsername(username: $value) {
      username
    }
  }
`

const AvatarSettings = ({ changeUsername }) => {
  return (
    <div className={styles.container}>
      <UserAvatar />
      <ImageEditor className={styles.avatar}>
        <div className={styles.addPhoto}>Add photo</div>
      </ImageEditor>
    </div>
  )
}

export default graphql(CHANGE_USERNAME_MUTATION, { name: 'changeUsername' })(
  AvatarSettings
)
