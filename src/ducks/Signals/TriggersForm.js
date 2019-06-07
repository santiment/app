import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import TriggerForm from './TriggerForm'

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  canRedirect: PropTypes.bool,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any
}

export const TriggersForm = ({
  settings,
  canRedirect,
  metaFormSettings,
  onSettingsChange
}) => {
  return (
    <TriggerForm
      metaFormSettings={metaFormSettings}
      canRedirect={canRedirect}
      settings={settings}
      onSettingsChange={onSettingsChange}
    />
  )
}

TriggersForm.propTypes = propTypes

const enhance = compose(
  connect(
    null,
    null
  )
)

export default enhance(TriggersForm)
