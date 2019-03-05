import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Raven from 'raven-js'
import { ImageSideButton, Block, addNewBlock } from 'medium-draft'
import { store } from '../../index'
import { showNotification } from '../../actions/rootActions'

const MAX_IMG_SIZE = 5000 // NOTE(vanguard): after uploading file with size than 5mb backend does not return imageUrl

class CustomImageSideButton extends ImageSideButton {
  onChange (e) {
    const file = e.target.files[0]
    const {
      mutate,
      setEditorState,
      getEditorState,
      close,
      onImgLoad
    } = this.props
    if (file.type.indexOf('image/') === 0) {
      if (file.size / 1024 > MAX_IMG_SIZE) {
        store.dispatch(showNotification('Image size is too large'))
        return
      }

      onImgLoad('start')

      mutate({ variables: { images: e.target.files } })
        .then(({ data: { uploadImage } }) => {
          onImgLoad('done')
          const imageData = uploadImage[0]
          const uploadImageUrl = imageData.imageUrl

          if (!uploadImageUrl) {
            store.dispatch(showNotification('Upload image error'))
            return
          }

          setEditorState(
            addNewBlock(getEditorState(), Block.IMAGE, {
              src: uploadImageUrl
            })
          )
        })
        .catch(error => {
          store.dispatch(showNotification('Upload image error'))
          Raven.captureException(error)
        })
    }
    close()
  }
}

export default graphql(gql`
  mutation($images: [Upload!]!) {
    uploadImage(images: $images) {
      contentHash
      fileName
      imageUrl
      hashAlgorithm
    }
  }
`)(CustomImageSideButton)
