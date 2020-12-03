import React, { useState, useEffect, useMemo } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import copy from 'copy-to-clipboard'
import Calendar from './Calendar'
import MetricsExplanation, {
  filterExplainableMetrics
} from '../Chart/Sidepanel/MetricsExplanation'
import { METRICS_EXPLANATION_PANE } from '../Chart/Sidepanel/panes'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import { useShortShareLink } from '../../../components/Share/hooks'
import styles from './Settings.module.scss'

export const SAN_HEADER_HEIGHT = 70

const CopyLink = ({ getShareLink }) => {
  const [timer, setTimer] = useState()

  useEffect(() => () => clearTimeout(timer), [timer])

  function onClick () {
    getShareLink().then(copy)
    setTimer(setTimeout(() => setTimer(), 2000))
  }

  return (
    <Button border className={styles.share} onClick={onClick}>
      <Icon type='link' className={styles.share__icon} />
      {timer ? 'Copied!' : 'Copy link'}
    </Button>
  )
}

export const ShareButton = () => {
  const { shortShareLink, getShortShareLink } = useShortShareLink()

  return (
    <>
      <ShareModalTrigger
        trigger={props => (
          <Button
            {...props}
            border
            onMouseDown={getShortShareLink}
            className={styles.share}
          >
            <Icon type='share' className={styles.share__icon} />
            Share
          </Button>
        )}
        classes={styles}
        shareLink={shortShareLink}
      />
      <CopyLink shareLink={shortShareLink} getShareLink={getShortShareLink} />
    </>
  )
}

export default ({
  className,
  headerRef,
  metrics,
  settings,
  sidepanel,
  isOverviewOpened,
  changeTimePeriod,
  toggleSidepanel,
  toggleOverview
}) => {
  const hasExplanaibles = useMemo(
    () => filterExplainableMetrics(metrics).length > 0,
    [metrics]
  )

  useEffect(
    () => {
      const { current: header } = headerRef
      let transform
      if (isOverviewOpened) {
        let { top } = header.getBoundingClientRect()

        if (window.scrollY < SAN_HEADER_HEIGHT) {
          top -= SAN_HEADER_HEIGHT - window.scrollY - 1
        }

        transform = `translateY(-${top}px)`
      } else {
        transform = null
      }
      header.style.transform = transform
    },
    [isOverviewOpened]
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      <Calendar settings={settings} changeTimePeriod={changeTimePeriod} />
      {!isOverviewOpened && hasExplanaibles && (
        <MetricsExplanation.Button
          onClick={() => toggleSidepanel(METRICS_EXPLANATION_PANE)}
          className={cx(
            styles.explain,
            sidepanel === METRICS_EXPLANATION_PANE && styles.explain_active
          )}
        />
      )}

      <ShareButton />

      <Button
        border
        className={cx(
          styles.mapview,
          isOverviewOpened && styles.mapview_active
        )}
        onClick={toggleOverview}
      >
        {isOverviewOpened ? 'Close' : 'Open'} Mapview
      </Button>
    </div>
  )
}
