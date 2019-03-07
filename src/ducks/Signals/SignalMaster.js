import React from 'react'
import { Button, Input } from '@santiment-network/ui'
import { connect } from 'react-redux'
import { createTrigger } from './actions'
import { fork } from './../../utils/utils'
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
    readyForConfirmitaion: false,
    settings: {},
    info: {}
  }

  render () {
    const { step, readyForConfirmitaion } = this.state
    return (
      <div className={styles.wrapper}>
        {step === STEPS.SETTINGS && (
          <div>
            <TriggerForm onSettingsChange={this.handleSettingsChange} />
            <Button
              variant={readyForConfirmitaion ? 'fill' : 'flat'}
              accent='positive'
              disabled={!readyForConfirmitaion}
              isActive={readyForConfirmitaion}
              onClick={() => this.handleChangeStep(STEPS.CONFIRM)}
            >
              Continue
            </Button>
          </div>
        )}
        {step === STEPS.CONFIRM && (
          <InfoSignalForm
            onBack={() => this.handleChangeStep(STEPS.SETTINGS)}
            onInfoSignalSubmit={this.handleInfoSignalSubmit}
          />
        )}
      </div>
    )
  }

  handleChangeStep = step => {
    this.setState({ step })
  }

  handleSettingsChange = settings => {
    this.setState({ settings }, () => {
      this.setState({ readyForConfirmitaion: true })
    })
  }

  handleInfoSignalSubmit = info => {
    this.setState({ info })
    console.log(info)
    // this.props.createTrigger({ ...this.state.settings, ...info })
  }
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignalMaster)
