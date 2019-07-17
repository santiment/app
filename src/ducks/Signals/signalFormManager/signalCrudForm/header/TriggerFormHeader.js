import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { RemoveSignalButton } from '../../../../../components/SignalCard/controls/SignalControls'
import styles from './TriggerFormHeader.module.scss'

const propTypes = {
  showTrigger: PropTypes.bool.isRequired
}

export const TriggerFormHeader = ({
  deleteTriggerFunc,
  showTriggerFunc,
  showTrigger,
  actionsEnabled,
  name = 'trigger'
}) => {
  return (
    <div className={styles.triggerHeader}>
      <div className={styles.triggerHeaderName}>{name}</div>
      <div className={styles.triggerHeaderActions}>
        <RemoveSignalButton
          signalTitle={name}
          className={styles.triggerHeaderButton}
          removeSignal={deleteTriggerFunc}
        />
        <Button
          type='button'
          className={cx(styles.triggerHeaderButton, styles.close)}
          onClick={showTriggerFunc}
          disabled={!actionsEnabled}
        >
          {showTrigger && <Icon type='arrow-up' />}
          {!showTrigger && <Icon type='arrow-down' />}
        </Button>
      </div>
    </div>
  )
}

TriggerFormHeader.propTypes = propTypes

export default TriggerFormHeader
