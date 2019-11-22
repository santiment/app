import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as actions from '../../../actions/types'
import UserAvatar from './UserAvatar'
import ImageEditor from './editor/ImageEditor'
import { store } from '../../../index'
import { showNotification } from '../../../actions/rootActions'
import { UPLOAD_IMG_QUERY } from '../../../components/ImageUpload'
import styles from './AvatarSettings.module.scss'

const CHANGE_AVATAR_MUTATION = gql`
  mutation changeAvatar($value: String!) {
    changeAvatar(avatar_url: $value) {
      avatarUrl
    }
  }
`

const AvatarSettings = ({
  changeAvatar,
  uploadImage,
  dispatchAvatarChanged,
  avatarUrl,
  onClose
}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={styles.container}>
      <UserAvatar />
      <ImageEditor
        imageUrl={avatarUrl}
        setOpen={setOpen}
        isOpen={isOpen}
        className={styles.avatar}
        onChange={file => {
          var newFile = new File([file], new Date().getTime() + '.jpeg', {
            type: 'image/jpeg',
            lastModified: Date.now()
          })
          uploadImage({ variables: { images: [newFile] } }).then((...rest) => {
            const [img] = rest

            if (img) {
              const {
                data: { uploadImage }
              } = img

              const [saved] = uploadImage
              if (saved) {
                const { imageUrl } = saved
                changeAvatar({ variables: { value: imageUrl } })
                  .then(() => {
                    dispatchAvatarChanged(imageUrl)
                    store.dispatch(
                      showNotification(`Avatar successfully changed`)
                    )
                    setOpen(false)
                  })
                  .catch(error => {
                    showNotification('Error was caused during changing avatar')
                    setOpen(false)
                  })
              }
            }
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
  graphql(CHANGE_AVATAR_MUTATION, { name: 'changeAvatar' }),
  graphql(UPLOAD_IMG_QUERY, { name: 'uploadImage' })
)

export default enhance(AvatarSettings)
