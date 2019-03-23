import React from 'react'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger } from './actions'
import TriggerForm from './TriggerForm'
import InfoSignalForm from './InfoSignalForm'
import styles from './TriggerForm.module.scss'
import { TRIGGER_BY_ID_QUERY } from './SignalsGQL'

const STEPS = {
  SETTINGS: 0,
  CONFIRM: 1
}

export class SignalMaster extends React.PureComponent {
  state = {
    step: STEPS.SETTINGS,
    settings: {}
  }

  render () {
    const { step } = this.state
    return (
      <div className={styles.wrapper}>
        {step === STEPS.SETTINGS && (
          <TriggerForm
            {...this.props.trigger.trigger}
            onSettingsChange={this.handleSettingsChange}
          />
        )}
        {step === STEPS.CONFIRM && (
          <InfoSignalForm
            {...this.props.trigger.trigger}
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
    console.log('sended')
    // this.props.createTrigger({ ...this.state.settings, ...info })
    // this.props.onCreated && this.props.onCreated()
    // this.props.redirect()
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

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(TRIGGER_BY_ID_QUERY, {
    skip: ({ isEdit, match }) => {
      if (!match) {
        return true
      }
      const id = match.params.id
      return !isEdit || !id
    },
    options: ({
      match: {
        params: { id }
      }
    }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { id: +id }
      }
    },
    props: ({ data: { trigger, loading, error } }) => {
      return {
        trigger: {
          trigger: (trigger || {}).trigger,
          isLoading: loading,
          isError: !!error
        }
      }
    }
  })
)

export default enhance(SignalMaster)
