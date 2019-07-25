import React, { useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from '../../common/actions'
import Message from '@santiment-network/ui/Message'
import Toggle from '@santiment-network/ui/Toggle'
import TriggersForm from '../signalCrudForm/signalsList/TriggersForm'
import AboutForm from '../aboutForm/AboutForm'
import { mapTriggerToFormProps, mapFormPropsToTrigger } from '../../utils/utils'
import { SIGNAL_ROUTES, TRIGGER_STEPS } from '../../common/constants'
import styles from '../signalCrudForm/signal/TriggerForm.module.scss'

const getTitle = (step, formData, { id }, isShared) => {
  const isUpdate = id > 0 && !isShared

  switch (step) {
    case TRIGGER_STEPS.SETTINGS: {
      return isUpdate ? 'Update signal' : 'Create signal'
    }
    case TRIGGER_STEPS.CONFIRM: {
      if (isUpdate) {
        return formData.isPublic
          ? 'Update public signal'
          : 'Update private signal'
      } else {
        return formData.isPublic
          ? 'Create public signal'
          : 'Create private signal'
      }
    }
    default: {
      return ''
    }
  }
}

const SignalMaster = ({
  canRedirect = true,
  step: propsStep = TRIGGER_STEPS.SETTINGS,
  trigger: propsTrigger = {},
  metaFormSettings,
  setTitle,
  onClose,
  redirect,
  updateTrigger,
  createTrigger,
  isShared = false
}) => {
  const { triggerId, isLoading, isError } = propsTrigger

  if (triggerId) {
    if (isLoading) {
      return (
        <div className={cx(styles.wrapper, styles.loading)}>{'Loading...'}</div>
      )
    } else if (isError) {
      return <Message variant='error'>{propsTrigger.errorMessage}</Message>
    }
  }

  const [state, setState] = useState({
    step: propsStep,
    trigger: {
      title: `Signal_[${new Date().toLocaleDateString('en-US')}]`,
      description: '',
      isActive: true,
      isPublic: false
    }
  })

  const { step, trigger } = state
  const triggerSettingsFormData = trigger ? mapTriggerToFormProps(trigger) : {}

  useEffect(
    () => {
      const { trigger } = state

      if (propsTrigger && propsTrigger.trigger && !trigger.id) {
        setState({
          trigger: {
            ...propsTrigger.trigger
          },
          step: propsStep
        })
      }
    },
    [propsTrigger]
  )

  useEffect(() => {
    triggerSettingsFormData &&
      setTitle &&
      setTitle(getTitle(step, triggerSettingsFormData, trigger, isShared))
  })

  const toggleSignalPublic = () => {
    const { trigger } = state
    const newValue = !trigger.isPublic
    const newTrigger = { ...trigger, isPublic: newValue }

    setState({ trigger: newTrigger })
  }

  const backToSettings = data => {
    const { trigger } = state
    setState({
      step: TRIGGER_STEPS.SETTINGS,
      trigger: { ...trigger, ...data }
    })
  }

  const handleSettingsChange = formProps => {
    const { trigger } = state
    setState({
      trigger: mapFormPropsToTrigger(formProps, trigger),
      step: TRIGGER_STEPS.CONFIRM
    })
  }

  const handleAboutFormSubmit = about => {
    const data = {
      ...state.trigger,
      ...about,
      shouldReload: canRedirect
    }

    const {
      trigger: { id }
    } = state

    if (id > 0) {
      updateTrigger(data)
    } else {
      createTrigger(data)
    }

    onClose && onClose()
    canRedirect && redirect && redirect()
  }

  const close = onClose || redirect

  return (
    <div className={styles.wrapper}>
      {step === TRIGGER_STEPS.SETTINGS && (
        <TriggersForm
          onClose={close}
          triggers={[trigger]}
          settings={triggerSettingsFormData}
          canRedirect={canRedirect}
          metaFormSettings={metaFormSettings}
          onSettingsChange={handleSettingsChange}
        />
      )}
      {step === TRIGGER_STEPS.CONFIRM && (
        <AboutForm
          triggerMeta={trigger}
          onBack={backToSettings}
          onSubmit={handleAboutFormSubmit}
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
  )
)

export default enhance(SignalMaster)
