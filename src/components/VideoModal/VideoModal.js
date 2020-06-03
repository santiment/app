import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import VideoPlayBtn from '../VideoPlayBtn/VideoPlayBtn'
import styles from './VideoModal.module.scss'

const VideoModal = ({ videoId }) => (
  <Dialog trigger={<VideoPlayBtn />} classes={styles}>
    <iframe
      className={styles.iframe}
      title='Video modal'
      allowfullscreen={true}
      allow='autoplay'
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`}
    />
  </Dialog>
)

export default VideoModal
