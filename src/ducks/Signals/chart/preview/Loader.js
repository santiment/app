import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import styles from './SignalPreview.module.scss'

const PreviewLoader = (
  <div className={styles.loaderWrapper}>
    <Loader className={styles.loader} />
  </div>
)

export default PreviewLoader
