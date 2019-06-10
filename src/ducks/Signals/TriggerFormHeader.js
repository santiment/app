import PropTypes from 'prop-types'
import React from 'react'
import styles from './TriggerForm.module.scss'
import { Icon, Button } from '@santiment-network/ui'

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
        <Button
          type='button'
          className={styles.triggerHeaderButton}
          onClick={deleteTriggerFunc}
        >
          <Icon type='remove' />
        </Button>
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
