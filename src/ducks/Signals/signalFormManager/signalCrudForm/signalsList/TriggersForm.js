import React from 'react'
import PropTypes from 'prop-types'
import TriggerForm from '../signal/TriggerForm'

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any,
  triggers: PropTypes.arrayOf(PropTypes.any)
}

export const TriggersForm = ({
  settings,
  triggers,
  metaFormSettings,
  onSettingsChange,
  onClose,
  formChangedCallback,
  isShared
}) => {
  return (
    <div>
      {triggers.map((trigger, index) => (
        <TriggerForm
          key={trigger.id || index}
          id={trigger.id}
          isShared={isShared}
          metaFormSettings={metaFormSettings}
          settings={settings}
          onSettingsChange={onSettingsChange}
          onRemovedSignal={onClose}
          formChangedCallback={formChangedCallback}
        />
      ))}
    </div>
  )
}

TriggersForm.propTypes = propTypes

export default TriggersForm
