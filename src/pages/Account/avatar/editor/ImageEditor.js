import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import styles from './ImageEditor.module.scss'

const ImageEditor = ({ children, className, onChange }) => {
  const [state, setState] = useState({
    imageSrc:
      'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000',
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1
  })

  const onCropChange = crop => {
    setState({ ...state, crop })
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height)
  }

  const onZoomChange = zoom => {
    setState({ ...state, zoom })
  }

  const { imageSrc, crop, zoom, aspect } = state

  return (
    <Dialog
      title='Create avatar'
      classes={styles}
      trigger={<div className={className}>{children}</div>}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <div className={styles.img}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape='round'
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>

        <div className={styles.actions}>
          <Button
            variant='fill'
            accent='positive'
            className={styles.cropBtn}
            onClick={() => onChange(imageSrc)}
          >
            Crop image
          </Button>
        </div>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default ImageEditor
