import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as actions from '../../../actions/types'
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

const AvatarEditor = ({
  mutateChangeAvatar,
  mutateUploadImage,
  dispatchAvatarChanged,
  avatarUrl,
  withRemove = true,
  withRemoveButton = false,
  children
}) => {
  const [isOpen, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const onChangeUrl = (url, forceClose = true) => {
    setSaving(true)
    return mutateChangeAvatar({ variables: { value: url } })
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
      .finally(() => setSaving(false))
  }

  return (
    <>
      <ImageEditor
        imageUrl={avatarUrl}
        setOpen={setOpen}
        isOpen={isOpen}
        className={styles.avatar}
        onChangeUrl={onChangeUrl}
        title={avatarUrl ? 'Change avatar' : 'Create avatar'}
        withRemoveButton={withRemoveButton}
        saving={saving}
        onChange={file => {
          let newFile = new File([file], new Date().getTime() + '.jpeg', {
            type: 'image/jpeg',
            lastModified: Date.now()
          })
          setSaving(true)
          mutateUploadImage({ variables: { images: [newFile] } })
            .then((...rest) => {
              const url = extractUploadedImageUrl(rest)

              if (url) {
                onChangeUrl(url)
              }
            })
            .finally(() => setSaving(false))
        }}
      >
        {children || (
          <div className={styles.addPhoto}>
            {avatarUrl ? 'Change photo' : 'Add photo'}
          </div>
        )}
      </ImageEditor>
      {withRemove && avatarUrl && (
        <div className={styles.removeBtn} onClick={() => onChangeUrl('')}>
          Remove
        </div>
      )}
    </>
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
  connect(null, mapDispatchToProps),
  graphql(CHANGE_AVATAR_MUTATION, { name: 'mutateChangeAvatar' }),
  graphql(UPLOAD_IMG_QUERY, { name: 'mutateUploadImage' })
)

export default enhance(AvatarEditor)
