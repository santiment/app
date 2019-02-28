import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Raven from 'raven-js'
import { ImageSideButton, Block, addNewBlock } from 'medium-draft'

class CustomImageSideButton extends ImageSideButton {
  onChange (e) {
    const file = e.target.files[0]
    const { mutate, setEditorState, getEditorState, close } = this.props
    if (file.type.indexOf('image/') === 0) {
      mutate({ variables: { images: e.target.files } })
        .then(rest => {
          const imageData = rest['data'].uploadImage[0]
          const uploadImageUrl = imageData ? imageData.imageUrl : null
          setEditorState(
            addNewBlock(getEditorState(), Block.IMAGE, {
              src: uploadImageUrl
            })
          )
        })
        .catch(error => {
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
