import React from 'react'
import ShareMedias from '../Share/medias/ShareMedias'
import styles from './SharePage.module.scss'

const SharePage = props => {
  return (
    <div className={styles.container}>
      Share
      <ShareMedias
        {...props}
        shareLink={window.location.href}
        showTitle={false}
        classes={styles}
      />
    </div>
  )
}

export default SharePage
