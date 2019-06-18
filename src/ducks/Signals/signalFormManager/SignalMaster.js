import React from 'react'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from '../common/actions'
import { Message, Toggle } from '@santiment-network/ui'
import TriggersForm from './signalCrudForm/signalsList/TriggersForm'
import AboutForm from './aboutForm/AboutForm'
import { TRIGGER_BY_ID_QUERY } from '../gql/SignalsGQL'
import { Icon } from '@santiment-network/ui'
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  mapGQLTriggerToProps
} from '../utils/utils'
import styles from './signalCrudForm/signal/TriggerForm.module.scss'

const STEPS = {
  SETTINGS: 0,
  CONFIRM: 1
}

export class SignalMaster extends React.PureComponent {
  static defaultProps = {
    canRedirect: true
  }

  state = {
    step: STEPS.SETTINGS,
    trigger: {
      title: `Signal_[${new Date().toLocaleDateString('en-US')}]`,
      description: 'Any',
      isActive: true,
      isPublic: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.trigger && newProps.trigger.trigger) {
      this.setState({
        trigger: {
          ...newProps.trigger.trigger
        }
      })
    }
  }

  render () {
    const { isEdit, triggerObj = {}, metaFormSettings, setTitle } = this.props

    if (isEdit && triggerObj.isLoading) {
      return 'Loading...'
    }
    if (isEdit && triggerObj.isError) {
      return <Message variant='error'>{triggerObj.errorMessage}</Message>
    }
    const { step, trigger: stateTrigger } = this.state

    const trigger = triggerObj.trigger || stateTrigger
    const triggerSettingsFormData = trigger
      ? mapTriggerToFormProps(trigger)
      : {}

    const triggerAboutFormData = {
      title: trigger.title,
      description: trigger.description
    }

    const toggleSignalPublic = () => {
      const { trigger } = this.state
      const newValue = !trigger.isPublic
      const newTrigger = { ...trigger, isPublic: newValue }

      this.setState({ trigger: newTrigger })
    }

    const getTitle = ({ id }) => {
      switch (step) {
        case STEPS.SETTINGS: {
          return id > 0 ? 'Update signal' : 'Create signal'
        }
        case STEPS.CONFIRM: {
          return triggerSettingsFormData.isPublic
            ? 'Create public signal'
            : 'Create private signal'
        }
        default: {
          return ''
        }
      }
    }

    setTitle && setTitle(getTitle(trigger))

    const close = this.props.onClose || this.props.redirect

    return (
      <div className={styles.wrapper}>
        {step === STEPS.SETTINGS && (
          <TriggersForm
            onClose={() => {
              close()
            }}
            triggers={[trigger]}
            settings={triggerSettingsFormData}
            canRedirect={this.props.canRedirect}
            metaFormSettings={{ ...metaFormSettings }}
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

        <div className={styles.triggerToggleBlock}>
          <Toggle onClick={toggleSignalPublic} isActive={trigger.isPublic} />
          <div className={styles.triggerToggleLabel}>
            {trigger.isPublic ? 'Public' : 'Private'}
          </div>
        </div>
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
      trigger: mapFormPropsToTrigger(formProps, trigger),
      step: STEPS.CONFIRM
    })
  }

  handleAboutFormSubmit = about => {
    const data = {
      ...this.state.trigger,
      ...about,
      shouldReload: this.props.canRedirect
    }

    if (this.props.isEdit) {
      this.props.updateTrigger(data)
    } else {
      this.props.createTrigger(data)
    }

    console.log(this.props)
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
  redirect: () => {
    dispatch(push('/sonar/feed/my-signals'))
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
    props: mapGQLTriggerToProps
  })
)

export default enhance(SignalMaster)
