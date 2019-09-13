import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './WatchlistAnomalies.module.scss'

const HelpTooltip = ({ withDesc = true, classes = {} }) => (
  <Tooltip
    className={styles.tooltip}
    position='top'
    align='end'
    trigger={
      <div className={styles.description}>
        <Icon
          type='question-round-small'
          className={cx(styles.question, classes.question)}
        />
        {withDesc && 'How it works'}
      </div>
    }
  >
    <Panel padding>
      Anomalies in metrics are detected using combination of statistical
      methods. Currently combination of this methodes defines boundary between
      normal and abnormal values.
    </Panel>
  </Tooltip>
)

export default HelpTooltip
