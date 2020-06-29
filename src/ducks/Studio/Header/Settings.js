import React, { useMemo } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Calendar from './Calendar'
import MetricsExplanation, {
  filterExplainableMetrics,
} from '../Chart/Sidepanel/MetricsExplanation'
import { METRICS_EXPLANATION_PANE } from '../Chart/Sidepanel/panes'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import styles from './Settings.module.scss'

function buildStudioShareLink() {
  const { origin, search } = window.location
  return `${origin}/studio${search}`
}

const ShareButton = withRouter(() => (
  <ShareModalTrigger
    trigger={(props) => (
      <Button {...props} className={styles.share}>
        <Icon type='share' />
      </Button>
    )}
    classes={styles}
    shareLink={buildStudioShareLink()}
  />
))

export default ({
  metrics,
  settings,
  sidepanel,
  className,
  changeTimePeriod,
  toggleSidepanel,
}) => {
  const hasExplanaibles = useMemo(
    () => filterExplainableMetrics(metrics).length > 0,
    [metrics],
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      {hasExplanaibles && (
        <MetricsExplanation.Button
          onClick={() => toggleSidepanel(METRICS_EXPLANATION_PANE)}
          className={cx(
            sidepanel === METRICS_EXPLANATION_PANE && styles.explain_active,
          )}
        />
      )}
      <Calendar settings={settings} changeTimePeriod={changeTimePeriod} />
      <ShareButton />
    </div>
  )
}
