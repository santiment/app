import React from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { ACTIVE_WIDGETS_QUERY } from './gql'
import VideoModal from '../VideoModal/VideoModal'
import { DarkVideoPlayBtn } from '../VideoPlayBtn/VideoPlayBtn'
import styles from './index.module.scss'

const extractYoutubeId = link => {
  if (!link) {
    return null
  }

  const items = link.split('=')
  return items[items.length - 1]
}

const EventBanner = ({ className }) => {
  const { data: { activeWidgets = [] } = {} } = useQuery(ACTIVE_WIDGETS_QUERY)
  const activeWidget = activeWidgets.length > 0 ? activeWidgets[0] : null

  if (!activeWidget) {
    return null
  }

  const videoId = extractYoutubeId(activeWidget.videoLink)

  return (
    <section className={cx(styles.wrapper, className)}>
      {!videoId && (
        <div className={styles.media}>
          <a
            href={activeWidget.videoLink}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            <img
              alt='Active widget'
              src={activeWidget.imageLink}
              className={styles.img}
            />
          </a>
        </div>
      )}
      {
        <VideoModal
          videoId={videoId}
          classes={styles}
          playBtn={DarkVideoPlayBtn}
        />
      }
      <div className={styles.info}>
        <h4 className={styles.title}>{activeWidget.title}</h4>
        <p className={styles.desc}>{activeWidget.description}</p>
      </div>
    </section>
  )
}

export default EventBanner
