import React from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from '../../common/actions'
import Message from '@santiment-network/ui/Message'
import Toggle from '@santiment-network/ui/Toggle'
import TriggersForm from '../signalCrudForm/signalsList/TriggersForm'
import AboutForm from '../aboutForm/AboutForm'
import { TRIGGER_BY_ID_QUERY } from '../../common/queries'
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  mapGQLTriggerToProps
} from '../../utils/utils'
import { SIGNAL_ROUTES, TRIGGER_STEPS } from '../../common/constants'
import styles from '../signalCrudForm/signal/TriggerForm.module.scss'

export class SignalMaster extends React.PureComponent {
  static defaultProps = {
    canRedirect: true,
    step: TRIGGER_STEPS.SETTINGS
  }

  state = {
    step: TRIGGER_STEPS.SETTINGS,
    trigger: {
      title: `Signal_[${new Date().toLocaleDateString('en-US')}]`,
      description: 'Any',
      isActive: true,
      isPublic: false
    }
  }

  componentDidUpdate (prevProps) {
    const { trigger } = this.state

    const newProps = this.props
    if (newProps.trigger && newProps.trigger.trigger && !trigger.id) {
      this.setState({
        trigger: {
          ...newProps.trigger.trigger
        },
        step: newProps.step
      })
    }
  }

  render () {
    const {
      triggerId,
      trigger: triggerObj = {},
      metaFormSettings,
      setTitle
    } = this.props

    if (triggerId && triggerObj.isLoading) {
      return (
        <div className={cx(styles.wrapper, styles.loading)}>{'Loading...'}</div>
      )
    }
    if (triggerId && triggerObj.isError) {
      return <Message variant='error'>{triggerObj.errorMessage}</Message>
    }

    const { step, trigger } = this.state

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
        case TRIGGER_STEPS.SETTINGS: {
          return id > 0 ? 'Update signal' : 'Create signal'
        }
        case TRIGGER_STEPS.CONFIRM: {
          if (id > 0) {
            return triggerSettingsFormData.isPublic
              ? 'Update public signal'
              : 'Update private signal'
          } else {
            return triggerSettingsFormData.isPublic
              ? 'Create public signal'
              : 'Create private signal'
          }
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
        {step === TRIGGER_STEPS.SETTINGS && (
          <TriggersForm
            onClose={close}
            triggers={[trigger]}
            settings={triggerSettingsFormData}
            canRedirect={this.props.canRedirect}
            metaFormSettings={metaFormSettings}
            onSettingsChange={this.handleSettingsChange}
          />
        )}
        {step === TRIGGER_STEPS.CONFIRM && (
          <AboutForm
            triggerMeta={triggerAboutFormData}
            isEdit={+triggerId > 0}
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
      step: TRIGGER_STEPS.SETTINGS,
      trigger: { ...trigger, ...prefilledData }
    })
  }

  handleSettingsChange = formProps => {
    const { trigger } = this.state

    this.setState({
      trigger: mapFormPropsToTrigger(formProps, trigger),
      step: TRIGGER_STEPS.CONFIRM
    })
  }

  handleAboutFormSubmit = about => {
    const data = {
      ...this.state.trigger,
      ...about,
      shouldReload: this.props.canRedirect
    }

    const {
      trigger: { id }
    } = this.state

    if (id > 0) {
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
  redirect: () => {
    dispatch(push(SIGNAL_ROUTES.MY_SIGNALS))
  }
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(TRIGGER_BY_ID_QUERY, {
    skip: data => {
      const { triggerId } = data
      return !triggerId
    },
    options: ({ triggerId: id }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { id: +id }
      }
    },
    props: mapGQLTriggerToProps
  })
)

export default enhance(SignalMaster)
