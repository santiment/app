import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button } from '@santiment-network/ui'
import styles from './TriggerFormHeader.module.scss'
import { RemoveSignalButton } from '../../../../../components/SignalCard/controls/SignalControls'

const propTypes = {
  showTrigger: PropTypes.bool.isRequired
}

export const TriggerFormHeader = ({
  deleteTriggerFunc,
  showTriggerFunc,
  showTrigger,
  actionsEnabled,
  name = 'Name the Trigger'
}) => {
  return (
    <div className={styles.triggerHeader}>
      <div className={styles.triggerHeaderName}>{name}</div>
      <div className={styles.triggerHeaderActions}>
        <RemoveSignalButton
          className={styles.triggerHeaderButton}
          removeSignal={deleteTriggerFunc}
        />
        <Button
          type='button'
          className={styles.triggerHeaderButton}
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
