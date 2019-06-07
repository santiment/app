import React from 'react'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from './actions'
import { Message, PanelWithHeader as Panel } from '@santiment-network/ui'
import TriggersForm from './TriggersForm'
import AboutForm from './AboutForm'
import styles from './TriggerForm.module.scss'
import { TRIGGER_BY_ID_QUERY } from './SignalsGQL'
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  mapTriggerToProps
} from './utils'

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
      return (
        <Message variant='error'>{this.props.trigger.errorMessage}</Message>
      )
    }
    const { step, trigger } = this.state
    const currentTrigger = trigger || (this.props.trigger || {}).trigger
    let formProps = currentTrigger ? mapTriggerToFormProps(currentTrigger) : {}
    formProps.showTrigger = true
    const meta = {
      title: currentTrigger ? currentTrigger.title : 'Any',
      description: currentTrigger ? currentTrigger.description : 'Any'
    }

    let metaFormSettings = { ...this.props.metaFormSettings }

    if (this.props.asset) {
      formProps = {
        ...formProps,
        target: {
          value: this.props.asset,
          label: this.props.asset
        }
      }
    }
    const getTitle = () => {
      return this.props.isEdit ? 'Update signal' : 'Create Signal'
    }

    return (
      <div className={styles.wrapper}>
        {step === STEPS.SETTINGS && (
          <Panel header={getTitle()} className={styles.TriggerPanel}>
            <TriggersForm
              settings={formProps}
              canRedirect={this.props.canRedirect}
              metaFormSettings={metaFormSettings}
              onSettingsChange={this.handleSettingsChange}
            />
          </Panel>
        )}
        {step === STEPS.CONFIRM && (
          <AboutForm
            {...meta}
            isEdit={this.props.isEdit}
            onBack={this.backToSettings}
            onSubmit={this.handleAboutFormSubmit}
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

  handleAboutFormSubmit = about => {
    const data = {
      ...this.state.trigger,
      ...about,
      ...{ shouldReload: this.props.canRedirect }
    }

    if (this.props.isEdit) {
      this.props.updateTrigger(data)
    } else {
      this.props.createTrigger(data)
    }
    this.props.onCreated && this.props.onCreated()
    this.props.canRedirect && this.props.redirect && this.props.redirect()
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
    props: mapTriggerToProps
  })
)

export default enhance(SignalMaster)
