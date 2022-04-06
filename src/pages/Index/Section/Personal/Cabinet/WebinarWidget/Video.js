import React, { useState, useRef } from 'react'
import cx from 'classnames'
import { extractYoutubeId } from './utils'
import YoutubeButton from './YoutubeButton'
import styles from './WebinarWidget.module.scss'

const Video = ({ url, imageUrl, title }) => {
  const videoRef = useRef(null)
  const [isActivated, setIsActivated] = useState(false)

  const videoId = extractYoutubeId(url)

  const onVideoClicked = () => {
    let iframe = document.createElement('iframe')

    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute('allow', 'autoplay')
    iframe.setAttribute(
      'src',
      `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding&showinfo=0&autoplay=1`,
    )
    videoRef.current.appendChild(iframe)
    setIsActivated(true)
  }

  return (
    <div
      className={cx(styles.video, isActivated && styles.enabledVideo)}
      onClick={onVideoClicked}
      ref={videoRef}
    >
      <div className={styles.preview}>
        <img
          className={styles.preview__img}
          src={imageUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
        />
        <YoutubeButton />
      </div>
    </div>
  )
}

export default Video
