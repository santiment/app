import { compose } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styles from './TriggerForm.module.scss'
import { Icon, Button } from '@santiment-network/ui'

const propTypes = {
  settings: PropTypes.any.isRequired,
  showTrigger: PropTypes.bool.isRequired
}

export const TriggerFormHeader = ({
  settings,
  deleteTriggerFunc,
  showTriggerFunc,
  showTrigger,
  actionsEnabled
}) => {
  console.log(settings)
  return (
    <div className={styles.triggerHeader}>
      <div className={styles.triggerHeaderName}>
        {settings.title || 'Name the Trigger'}
      </div>
      <div className={styles.triggerHeaderActions}>
        <Button
          type='button'
          onClick={deleteTriggerFunc}
          disabled={!actionsEnabled}
        >
          <Icon type='remove' />
        </Button>
        <Button
          type='button'
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

const enhance = compose(
  connect(
    null,
    null
  )
)

export default enhance(TriggerFormHeader)
