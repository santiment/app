import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import VideoPlayBtn from '../VideoPlayBtn/VideoPlayBtn'
import styles from './VideoModal.module.scss'

const VideoModal = ({ videoId }) => (
  <Dialog
    trigger={
      <div
        className={styles.video}
        style={{
          backgroundImage: `url('https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg')`
        }}
      >
        <VideoPlayBtn className={styles.icon} />
        <div className={styles.darkWrapper} />
      </div>
    }
    classes={styles}
  >
    <iframe
      className={styles.iframe}
      title='Video modal'
      allowFullScreen={true}
      allow='autoplay'
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`}
    />
  </Dialog>
)

export default VideoModal
