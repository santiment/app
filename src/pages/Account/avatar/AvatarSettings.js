import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import UserAvatar from './UserAvatar'
import ImageEditor from './editor/ImageEditor'
import { store } from '../../../index'
import { showNotification } from '../../../actions/rootActions'
import styles from './AvatarSettings.module.scss'
import * as actions from '../../../actions/types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

const CHANGE_AVATAR_MUTATION = gql`
  mutation changeAvatar($value: String!) {
    changeAvatar(avatar_url: $value) {
      avatarUrl
    }
  }
`

const AvatarSettings = ({ changeAvatar, dispatchAvatarChanged }) => {
  console.log(changeAvatar)
  return (
    <div className={styles.container}>
      <UserAvatar />
      <ImageEditor
        className={styles.avatar}
        onChange={url => {
          changeAvatar({ variables: { value: url } })
            .then(() => {
              dispatchAvatarChanged(url)
              store.dispatch(showNotification(`Avatar successfully changed`))
            })
            .catch(error => {
              showNotification('Error was caused during changing avatar')
            })
        }}
      >
        <div className={styles.addPhoto}>Add photo</div>
      </ImageEditor>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchAvatarChanged: avatarUrl =>
    dispatch({
      type: actions.USER_AVATAR_CHANGE,
      avatarUrl
    })
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(CHANGE_AVATAR_MUTATION, { name: 'changeAvatar' })
)

export default enhance(AvatarSettings)
