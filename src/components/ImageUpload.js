import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const UPLOAD_IMG_QUERY = gql`
  mutation($images: [Upload!]!) {
    uploadImage(images: $images) {
      contentHash
      fileName
      imageUrl
      hashAlgorithm
    }
  }
`

export const extractUploadedImageUrl = data => {
  const [first] = data
  if (first) {
    const {
      data: { uploadImage }
    } = first

    const [image] = uploadImage
    if (image) {
      const { imageUrl } = image

      return imageUrl
    }
  }
}

const ImageUploadTrigger = props => <input type='file' required {...props} />

export default graphql(UPLOAD_IMG_QUERY)(
  ({ mutate, trigger: El = ImageUploadTrigger, onUploaded, className }) => {
    const onChange = ({ target: { validity, files } }) => {
      validity.valid &&
        mutate({ variables: { images: files } }).then((...rest) => {
          onUploaded && onUploaded(rest)
        })
    }

    return <El onChange={onChange} className={className} />
  }
)
