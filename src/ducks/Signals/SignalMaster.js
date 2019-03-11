import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createTrigger } from './actions'
import TriggerForm from './TriggerForm'
import InfoSignalForm from './InfoSignalForm'
import styles from './TriggerForm.module.scss'

const STEPS = {
  SETTINGS: 0,
  CONFIRM: 1
}

export class SignalMaster extends React.PureComponent {
  state = {
    step: STEPS.SETTINGS,
    settings: {},
    info: {}
  }

  render () {
    const { step } = this.state
    return (
      <div className={styles.wrapper}>
        {step === STEPS.SETTINGS && (
          <TriggerForm onSettingsChange={this.handleSettingsChange} />
        )}
        {step === STEPS.CONFIRM && (
          <InfoSignalForm
            onBack={this.backToSettings}
            onInfoSignalSubmit={this.handleInfoSignalSubmit}
          />
        )}
      </div>
    )
  }

  backToSettings = () => {
    this.setState({ step: STEPS.SETTINGS })
  }

  handleSettingsChange = settings => {
    this.setState({ settings, step: STEPS.CONFIRM })
  }

  handleInfoSignalSubmit = info => {
    this.setState({ info }, () => {
      this.props.createTrigger({ ...this.state.settings, ...info })
      this.props.onCreated && this.props.onCreated()
      this.props.redirect()
    })
  }
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  },
  redirect: (path = '/sonar/feed/my-signals') => {
    dispatch(push(path))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignalMaster)
