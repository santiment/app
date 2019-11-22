import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const UPLOAD_IMG_QUERY = gql`
  mutation($images: [Upload!]!) {
    uploadImage(images: $images) {
      contentHash
      fileName
      imageUrl
      hashAlgorithm
    }
  }
`

const ImageUploadTrigger = <input type='file' multiple required />

export default graphql(UPLOAD_IMG_QUERY)(
  ({ mutate, trigger: El = ImageUploadTrigger }) => {
    const onChange = ({ target: { validity, files } }) => {
      console.log(files)
      debugger
      validity.valid &&
        mutate({ variables: { images: files } }).then((...rest) => {
          console.log(rest)
        })
    }

    const onClick = () => {}

    return <El onChange={onChange} onClick={onClick} />
  }
)
