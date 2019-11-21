import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import styles from './ImageEditor.module.scss'

const ImageEditor = ({ children, onChange, className }) => {
  return (
    <Dialog
      title='Create avatar'
      classes={styles}
      trigger={<div className={className}>{children}</div>}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <div className={styles.img} />

        <div className={styles.actions}>
          <Button
            variant='fill'
            accent='positive'
            className={styles.cropBtn}
            onClick={onChange}
          >
            Crop image
          </Button>
        </div>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default ImageEditor
