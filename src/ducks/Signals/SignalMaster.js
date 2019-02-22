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

export class SignalMaster extends React.Component {
  state = {
    step: STEPS.SETTINGS,
    readyForConfirmitaion: false,
    settings: {},
    info: {}
  }

  render () {
    return (
      <div className={styles.wrapper}>
        {ifStepSettings({
          ...this.state,
          handleChangeStep: this.handleChangeStep,
          handleSettingsChange: this.handleSettingsChange
        })}
        {ifStepConfirm({
          ...this.state,
          ...this.props,
          handleChangeStep: this.handleChangeStep,
          handleInfoSignalChange: this.handleInfoSignalChange
        })}
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

  handleInfoSignalChange = info => {
    this.setState({ info })
  }
}

const ifStepSettings = fork(
  ({ step }) => step === STEPS.SETTINGS,
  ({
    handleChangeStep,
    handleSettingsChange,
    readyForConfirmitaion = false
  }) => (
    <div>
      <TriggerForm onSettingsChange={handleSettingsChange} />
      <Button
        variant={readyForConfirmitaion ? 'fill' : 'flat'}
        accent='positive'
        disabled={!readyForConfirmitaion}
        isActive={readyForConfirmitaion}
        onClick={() => handleChangeStep(STEPS.CONFIRM)}
      >
        Continue
      </Button>
    </div>
  )
)

const ifStepConfirm = fork(
  ({ step }) => step === STEPS.CONFIRM,
  ({
    createTrigger,
    handleChangeStep,
    readyForConfirmitaion,
    handleInfoSignalChange,
    step,
    info,
    ...rest
  }) => (
    <div>
      <InfoSignalForm onInfoSignalChange={handleInfoSignalChange} />
      <Button
        variant={'flat'}
        accent='normal'
        border
        onClick={() => handleChangeStep(STEPS.SETTINGS)}
      >
        Back
      </Button>
      <Button
        variant={'fill'}
        accent='positive'
        onClick={() => createTrigger({ ...rest.settings, ...info })}
      >
        Create
      </Button>
    </div>
  )
)

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignalMaster)
