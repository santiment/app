import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import getCroppedImg from './utils'
import ImageUpload, {
  extractUploadedImageUrl
} from '../../../../components/ImageUpload'
import styles from './ImageEditor.module.scss'

const MAX_ZOOM = 2
const MIN_ZOOM = 1
const STEP_ZOOM = 0.05

const OnStepChange = ({ onClick, className }) => {
  return <Icon type='picture' className={className} onClick={onClick} />
}

const ImageEditor = ({
  imageUrl,
  children,
  className,
  onChange,
  setOpen,
  onChangeUrl,
  isOpen,
  title
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onZoomChange = value =>
    setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value)))

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(
    () => {
      setZoom(MIN_ZOOM)
    },
    [imageUrl]
  )

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

  const onUploaded = data => {
    const url = extractUploadedImageUrl(data)

    if (url) {
      onChangeUrl && onChangeUrl(url, false)
    }
  }

  return (
    <Dialog
      title={title}
      classes={styles}
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={<div className={className}>{children}</div>}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <div className={styles.img}>
          {imageUrl && (
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
              onZoomChange={onZoomChange}
            />
          )}
          {!imageUrl && <div className={styles.round} />}
        </div>

        <div className={styles.actions}>
          <div className={styles.sliderContainer}>
            <OnStepChange
              onClick={() => onZoomChange(zoom - STEP_ZOOM)}
              className={styles.zoomMin}
            />

            <input
              type='range'
              step={STEP_ZOOM}
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              value={zoom}
              onChange={event => onZoomChange(event.target.value)}
              className={styles.slider}
            />

            <OnStepChange
              onClick={() => onZoomChange(zoom + STEP_ZOOM)}
              className={styles.zoomMax}
            />
          </div>

          <div className={styles.btns}>
            <Button border className={styles.addBtn}>
              <ImageUpload
                className={styles.fileLoader}
                onUploaded={onUploaded}
              />
              Upload
            </Button>
            {imageUrl && (
              <Button
                variant='fill'
                accent='positive'
                disabled={!imageUrl}
                className={styles.cropBtn}
                onClick={showCroppedImage}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default ImageEditor
