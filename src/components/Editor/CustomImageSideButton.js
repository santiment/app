import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Raven from 'raven-js'
import { ImageSideButton, Block, addNewBlock } from 'medium-draft'
import { Icon } from '@santiment-network/ui'
import styles from './CustomImageSideButton.module.scss'

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
      onImgLoad('start')

      mutate({ variables: { images: e.target.files } })
        .then(rest => {
          onImgLoad('done')
          const imageData = rest['data'].uploadImage[0]
          const uploadImageUrl = imageData ? imageData.imageUrl : null

          setEditorState(
            addNewBlock(getEditorState(), Block.IMAGE, {
              src: uploadImageUrl
            })
          )
        })
        .catch(error => {
          onImgLoad('error')
          Raven.captureException(error)
        })
    }
    close()
  }

  render () {
    return (
      <div className='md-sd-button'>
        <label className={styles.label} htmlFor='md-sd-img-button'>
          <Icon type='picture' height={17} />
        </label>
        <input
          className={styles.input}
          id='md-sd-img-button'
          type='file'
          accept='image/*'
          onChange={this.onChange}
        />
      </div>
    )
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
