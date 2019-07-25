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

  const [stateTrigger, setStateTrigger] = useState({
    title: '',
    description: '',
    isActive: true,
    isPublic: false
  })
  const [stateStep, setStateStep] = useState(propsStep)

  const triggerSettingsFormData = mapTriggerToFormProps(stateTrigger)

  useEffect(
    () => {
      if (propsTrigger && propsTrigger.trigger && !stateTrigger.id) {
        setStateTrigger({
          ...propsTrigger.trigger
        })
        setStateStep(propsStep)
      }
    },
    [propsTrigger]
  )

  useEffect(() => {
    setTitle &&
      setTitle(
        getTitle(stateStep, triggerSettingsFormData, stateTrigger, isShared)
      )
  })

  const toggleSignalPublic = () => {
    const newValue = !stateTrigger.isPublic
    setStateTrigger({ ...stateTrigger, isPublic: newValue })
  }

  const backToSettings = data => {
    setStateTrigger({ ...stateTrigger, ...data })
    setStateStep(TRIGGER_STEPS.SETTINGS)
  }

  const handleSettingsChange = formProps => {
    setStateTrigger(mapFormPropsToTrigger(formProps, stateTrigger))
    setStateStep(TRIGGER_STEPS.CONFIRM)
  }

  const handleAboutFormSubmit = about => {
    const data = {
      ...stateTrigger,
      ...about,
      shouldReload: canRedirect
    }

    const { id } = stateTrigger

    if (id > 0 && !isShared) {
      updateTrigger(data)
    } else {
      delete data.id
      createTrigger(data)
    }

    onClose && onClose()
    canRedirect && redirect && redirect()
  }

  const close = onClose || redirect

  return (
    <div className={styles.wrapper}>
      {stateStep === TRIGGER_STEPS.SETTINGS && (
        <TriggersForm
          isShared={isShared}
          onClose={close}
          triggers={[stateTrigger]}
          settings={triggerSettingsFormData}
          canRedirect={canRedirect}
          metaFormSettings={metaFormSettings}
          onSettingsChange={handleSettingsChange}
        />
      )}
      {stateStep === TRIGGER_STEPS.CONFIRM && (
        <AboutForm
          isShared={isShared}
          triggerMeta={stateTrigger}
          onBack={backToSettings}
          onSubmit={handleAboutFormSubmit}
        />
      )}

      <div className={styles.triggerToggleBlock}>
        <Toggle onClick={toggleSignalPublic} isActive={stateTrigger.isPublic} />
        <div className={styles.triggerToggleLabel}>
          {stateTrigger.isPublic ? 'Public' : 'Private'}
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
