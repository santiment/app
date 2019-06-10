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
import { Icon } from '@santiment-network/ui'
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  mapTriggerToProps
} from './utils'
import { Button } from 'semantic-ui-react'

const STEPS = {
  SETTINGS: 0,
  CONFIRM: 1
}

export class SignalMaster extends React.PureComponent {
  state = {
    step: STEPS.SETTINGS,
    trigger: {
      title: `Signal_[${new Date().toLocaleDateString('en-US')}]`,
      description: 'Any'
    }
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
    let triggerSettingsFormData = currentTrigger
      ? mapTriggerToFormProps(currentTrigger)
      : {}

    const triggerAboutFormData = {
      title: currentTrigger.title,
      description: currentTrigger.description
    }

    let metaFormSettings = { ...this.props.metaFormSettings }

    if (this.props.asset) {
      triggerSettingsFormData = {
        ...triggerSettingsFormData,
        target: {
          value: this.props.asset,
          label: this.props.asset
        }
      }
    }
    const getTitle = () => {
      switch (step) {
        case STEPS.SETTINGS: {
          return this.props.isEdit ? 'Update signal' : 'Create Signal'
        }
        case STEPS.CONFIRM: {
          return triggerSettingsFormData.isActive
            ? 'Create public signal'
            : 'Create private signal'
        }
        default: {
          return ''
        }
      }
    }

    return (
      <div className={styles.wrapper}>
        <Icon
          className={styles.closeButton}
          onClick={this.props.onClose}
          type='close'
        />
        <Panel header={getTitle()} className={styles.TriggerPanel}>
          {step === STEPS.SETTINGS && (
            <TriggersForm
              settings={triggerSettingsFormData}
              canRedirect={this.props.canRedirect}
              metaFormSettings={metaFormSettings}
              triggerMeta={triggerAboutFormData}
              onSettingsChange={this.handleSettingsChange}
            />
          )}
          {step === STEPS.CONFIRM && (
            <AboutForm
              triggerMeta={triggerAboutFormData}
              isEdit={this.props.isEdit}
              onBack={this.backToSettings}
              onSubmit={this.handleAboutFormSubmit}
            />
          )}
        </Panel>
      </div>
    )
  }

  backToSettings = prefilledData => {
    const { trigger } = this.state
    this.setState({
      step: STEPS.SETTINGS,
      trigger: { ...trigger, ...prefilledData }
    })
  }

  handleSettingsChange = formProps => {
    const { trigger } = this.state
    this.setState({
      trigger: mapFormPropsToTrigger(
        formProps,
        (this.props.trigger || {}).trigger || trigger
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
    this.props.onClose && this.props.onClose()
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
