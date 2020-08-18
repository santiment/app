import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as actions from '../../../actions/types'
import UserAvatar from './UserAvatar'
import ImageEditor from './editor/ImageEditor'
import { store } from '../../../redux'
import { showNotification } from '../../../actions/rootActions'
import {
  extractUploadedImageUrl,
  UPLOAD_IMG_QUERY
} from '../../../components/ImageUpload'
import styles from './AvatarSettings.module.scss'

const CHANGE_AVATAR_MUTATION = gql`
  mutation changeAvatar($value: String!) {
    changeAvatar(avatar_url: $value) {
      avatarUrl
    }
  }
`

const AvatarSettings = ({
  mutateChangeAvatar,
  mutateUploadImage,
  dispatchAvatarChanged,
  avatarUrl
}) => {
  const [isOpen, setOpen] = useState(false)

  const onChangeUrl = (url, forceClose = true) => {
    mutateChangeAvatar({ variables: { value: url } })
      .then(() => {
        dispatchAvatarChanged(url)
        store.dispatch(
          showNotification(`Avatar successfully ${url ? 'changed' : 'removed'}`)
        )
        forceClose && setOpen(false)
      })
      .catch(error => {
        showNotification('Error was caused during changing avatar')
        setOpen(false)
      })
  }

  return (
    <div className={styles.container}>
      <UserAvatar as='div' />
      <ImageEditor
        imageUrl={avatarUrl}
        setOpen={setOpen}
        isOpen={isOpen}
        className={styles.avatar}
        onChangeUrl={onChangeUrl}
        title={avatarUrl ? 'Change avatar' : 'Create avatar'}
        onChange={file => {
          let newFile = new File([file], new Date().getTime() + '.jpeg', {
            type: 'image/jpeg',
            lastModified: Date.now()
          })
          mutateUploadImage({ variables: { images: [newFile] } }).then(
            (...rest) => {
              const url = extractUploadedImageUrl(rest)

              if (url) {
                onChangeUrl(url)
              }
            }
          )
        }}
      >
        <div className={styles.addPhoto}>
          {avatarUrl ? 'Change photo' : 'Add photo'}
        </div>
      </ImageEditor>
      {avatarUrl && (
        <div className={styles.removeBtn} onClick={() => onChangeUrl('')}>
          Remove
        </div>
      )}
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

const mapStateToProps = ({ user: { data } }) => {
  return {
    avatarUrl: data && !!data.id ? data.avatarUrl : ''
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(CHANGE_AVATAR_MUTATION, { name: 'mutateChangeAvatar' }),
  graphql(UPLOAD_IMG_QUERY, { name: 'mutateUploadImage' })
)

export default enhance(AvatarSettings)
