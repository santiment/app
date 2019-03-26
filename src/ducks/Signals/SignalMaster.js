import React from 'react'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from './actions'
import TriggerForm from './TriggerForm'
import InfoSignalForm from './InfoSignalForm'
import styles from './TriggerForm.module.scss'
import { TRIGGER_BY_ID_QUERY } from './SignalsGQL'
import { mapTriggerToFormProps, mapFormPropsToTrigger } from './utils'

const STEPS = {
  SETTINGS: 0,
  CONFIRM: 1
}

export class SignalMaster extends React.PureComponent {
  state = {
    step: STEPS.SETTINGS,
    trigger: undefined
  }

  render () {
    if (this.props.isEdit && this.props.trigger.isLoading) {
      return 'Loading...'
    }
    if (this.props.isEdit && this.props.trigger.isError) {
      return this.props.trigger.errorMessage
    }
    const { step, trigger } = this.state
    const currentTrigger = trigger || (this.props.trigger || {}).trigger
    console.log(currentTrigger)
    return (
      <div className={styles.wrapper}>
        {step === STEPS.SETTINGS && (
          <TriggerForm
            settings={mapTriggerToFormProps(currentTrigger)}
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

  handleSettingsChange = formProps => {
    this.setState({
      trigger: mapFormPropsToTrigger(
        formProps,
        (this.props.trigger || {}).trigger
      ),
      step: STEPS.CONFIRM
    })
  }

  handleInfoSignalSubmit = info => {
    if (this.props.isEdit) {
      this.props.updateTrigger({ ...this.state.trigger, ...info })
    } else {
      this.props.createTrigger({ ...this.state.trigger, ...info })
    }
    // TODO: make it async
    this.props.onCreated && this.props.onCreated()
    this.props.redirect()
  }
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  },
  updateTrigger: payload => {
    dispatch(updateTrigger(payload))
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
      if (!loading && !trigger.trigger.settings.target.hasOwnProperty('slug')) {
        return {
          trigger: {
            isError: true,
            isLoading: false,
            trigger: null,
            errorMessage: 'This is an unsupported type of signal'
          }
        }
      }
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
