import React, { useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from '../../common/actions'
import Message from '@santiment-network/ui/Message'
import TriggersForm from '../signalCrudForm/signalsList/TriggersForm'
import { mapTriggerToFormProps, mapFormPropsToTrigger } from '../../utils/utils'
import { SIGNAL_ROUTES } from '../../common/constants'
import styles from '../signalCrudForm/signal/TriggerForm.module.scss'

const getTitle = (formData, { id }, isShared) => {
  const isUpdate = id > 0 && !isShared
  const publicWord = formData.isPublic ? 'public' : 'private'
  if (isUpdate) {
    return `Update ${publicWord} signal`
  } else {
    return `Create ${publicWord} signal`
  }
}

const SignalMaster = ({
  canRedirect = true,
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

  const triggerSettingsFormData = mapTriggerToFormProps(stateTrigger)

  useEffect(
    () => {
      if (propsTrigger && propsTrigger.trigger && !stateTrigger.id) {
        setStateTrigger({
          ...propsTrigger.trigger
        })
      }
    },
    [propsTrigger]
  )

  useEffect(() => {
    setTitle &&
      setTitle(getTitle(triggerSettingsFormData, stateTrigger, isShared))
  })

  const handleSettingsChange = formProps => {
    const newTrigger = mapFormPropsToTrigger(formProps, stateTrigger)

    const data = {
      ...newTrigger,
      shouldReload: canRedirect
    }

    const { id } = data

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
      <TriggersForm
        isShared={isShared}
        onClose={close}
        triggers={[stateTrigger]}
        settings={triggerSettingsFormData}
        canRedirect={canRedirect}
        metaFormSettings={metaFormSettings}
        onSettingsChange={handleSettingsChange}
      />
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
