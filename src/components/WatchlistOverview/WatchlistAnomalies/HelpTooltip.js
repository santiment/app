import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './WatchlistAnomalies.module.scss'

const HelpTooltip = ({
  withDesc = true,
  classes = {},
  note,
  children,
  position = 'top',
  align = 'end'
}) => (
  <Tooltip
    on='click'
    className={cx(styles.tooltip, classes.tooltip)}
    position={position}
    align={align}
    trigger={
      <div className={cx(styles.description, classes.helpTrigger)}>
        <Icon
          type='question-round-small'
          className={cx(styles.question, classes.question)}
        />
        {withDesc && 'How it works'}
      </div>
    }
  >
    <Panel padding>
      {children || (
        <>
          Anomalies in metrics are detected using combination of statistical
          methods. Currently combination of this methodes defines boundary
          between normal and abnormal values.
          {note && (
            <>
              <br />
              {note}
            </>
          )}
        </>
      )}
    </Panel>
  </Tooltip>
)

export default HelpTooltip
