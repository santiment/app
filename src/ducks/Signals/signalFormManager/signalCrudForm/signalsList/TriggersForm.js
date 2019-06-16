import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from '@santiment-network/ui'
import TriggerForm from '../signal/TriggerForm'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  canRedirect: PropTypes.bool,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any,
  triggers: PropTypes.arrayOf(PropTypes.any)
}

export const TriggersForm = ({
  settings,
  triggers,
  canRedirect,
  metaFormSettings,
  onSettingsChange,
  onClose
}) => {
  return (
    <div>
      {triggers.map((trigger, index) => (
        <TriggerForm
          key={trigger.id || index}
          trigger={trigger}
          metaFormSettings={metaFormSettings}
          canRedirect={canRedirect}
          settings={settings}
          onSettingsChange={onSettingsChange}
          onRemovedSignal={onClose}
        />
      ))}
      <div className={styles.addNewTriggerBlock}>
        <div className={styles.row}>
          <Button type='button' disabled>
            <Icon type='plus-round' />
            <div>&nbsp; Add Trigger</div>
          </Button>
        </div>
      </div>
    </div>
  )
}

TriggersForm.propTypes = propTypes

export default TriggersForm
