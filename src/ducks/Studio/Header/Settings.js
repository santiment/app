import React, { useEffect, useMemo } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Calendar from './Calendar'
import MetricsExplanation, {
  filterExplainableMetrics
} from '../Chart/Sidepanel/MetricsExplanation'
import { METRICS_EXPLANATION_PANE } from '../Chart/Sidepanel/panes'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import styles from './Settings.module.scss'

export const SAN_HEADER_HEIGHT = 70

function buildStudioShareLink () {
  const { origin, search } = window.location
  return `${origin}/studio${search}`
}

const ShareButton = withRouter(() => (
  <ShareModalTrigger
    trigger={props => (
      <Button {...props} className={styles.share}>
        <Icon type='share' />
      </Button>
    )}
    classes={styles}
    shareLink={buildStudioShareLink()}
  />
))

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
            sidepanel === METRICS_EXPLANATION_PANE && styles.explain_active
          )}
        />
      )}
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
      <ShareButton />
    </div>
  )
}
