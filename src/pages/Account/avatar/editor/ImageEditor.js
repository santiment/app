import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import getCroppedImg from './utils'
import ImageUpload from '../../../../components/ImageUpload'
import styles from './ImageEditor.module.scss'

const ImageEditor = ({
  imageUrl,
  children,
  className,
  onChange,
  setOpen,
  isOpen
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(
    async () => {
      try {
        const croppedImage = await getCroppedImg(
          imageUrl,
          croppedAreaPixels,
          rotation
        )

        onChange(croppedImage)
      } catch (e) {
        console.error(e)
      }
    },
    [croppedAreaPixels, rotation]
  )

  return (
    <Dialog
      title='Create avatar'
      classes={styles}
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={<div className={className}>{children}</div>}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <div className={styles.img}>
          <Cropper
            image={imageUrl}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={1}
            cropShape='round'
            showGrid={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className={styles.actions}>
          <ImageUpload />
          <Button
            variant='fill'
            accent='positive'
            className={styles.cropBtn}
            onClick={showCroppedImage}
          >
            Crop image
          </Button>
        </div>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default ImageEditor
