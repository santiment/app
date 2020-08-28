import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import isEqual from 'lodash.isequal'
import Icon from '@santiment-network/ui/Icon'
import { ACTIVE_WIDGETS_QUERY } from './gql'
import { DarkVideoPlayBtn } from '../VideoPlayBtn/VideoPlayBtn'
import styles from './index.module.scss'

const extractYoutubeId = link => {
  if (!link) {
    return null
  }

  const items = link.split('=')
  return items[items.length - 1]
}

const HIDDEN_WIDGET_KEY = 'HIDDEN_WIDGET_KEY'

function canShowWidget (activeWidget) {
  if (!activeWidget) {
    return false
  }

  const lastWidget = localStorage.getItem(HIDDEN_WIDGET_KEY)
  return !lastWidget || !isEqual(activeWidget, JSON.parse(lastWidget))
}

const EventBanner = ({ className }) => {
  const { data: { activeWidgets = [] } = {} } = useQuery(ACTIVE_WIDGETS_QUERY)
  const activeWidget = activeWidgets.length > 0 ? activeWidgets[0] : null

  const [show, setShow] = useState(false)
  const [showCloseAnimation, setShowCloseAnimation] = useState(false)

  useEffect(
    () => {
      setShow(canShowWidget(activeWidget))
    },
    [activeWidget]
  )

  const hideTooltip = () => {
    localStorage.setItem(HIDDEN_WIDGET_KEY, JSON.stringify(activeWidget))
    setShowCloseAnimation(true)
    setTimeout(() => {
      setShow(false)
      setShowCloseAnimation(false)
    }, 1000)
  }

  if (!show || !activeWidget) {
    return null
  }

  const videoId = extractYoutubeId(activeWidget.videoLink)
  const coverImage =
    activeWidget.imageLink ||
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <section
      className={cx(
        styles.wrapper,
        className,
        showCloseAnimation && styles.wrapper__hide
      )}
    >
      <div
        className={cx(
          styles.closeContainer,
          showCloseAnimation && styles.closeContainer__hide
        )}
      >
        <a
          href={activeWidget.videoLink}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.media}
          style={{ backgroundImage: `url('${coverImage}')` }}
        >
          <DarkVideoPlayBtn />
        </a>
        <div className={styles.info}>
          <h4 className={styles.title}>{activeWidget.title}</h4>
          <p className={styles.desc}>{activeWidget.description}</p>
        </div>

        <Icon
          type='close-medium'
          className={styles.close}
          onClick={hideTooltip}
        />
      </div>
    </section>
  )
}

export default EventBanner
