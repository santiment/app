import React, { useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from '../../common/actions'
import Message from '@santiment-network/ui/Message'
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  getNewTitle,
  getNewDescription
} from '../../utils/utils'
import { SIGNAL_ROUTES } from '../../common/constants'
import TriggerForm from '../signalCrudForm/signal/TriggerForm'
import SharedTriggerForm from '../sharedForm/SharedTriggerForm'
import {
  DEFAULT_FORM_META_SETTINGS,
  METRIC_DEFAULT_VALUES,
  PRICE,
  PRICE_PERCENT_CHANGE
} from '../../utils/constants'
import styles from '../signalCrudForm/signal/TriggerForm.module.scss'

const mapFormSettings = (baseSettings, meta) => {
  const formMetric =
    meta && meta.metric ? meta.metric.value.value : PRICE_PERCENT_CHANGE

  const metaFormSettings = { ...DEFAULT_FORM_META_SETTINGS, ...meta }

  let settings = {
    ...METRIC_DEFAULT_VALUES[formMetric],
    target: metaFormSettings.target.value
      ? metaFormSettings.target.value
      : baseSettings.target,
    metric: metaFormSettings.metric.value
      ? metaFormSettings.metric.value
      : baseSettings.metric,
    type: metaFormSettings.type.value
      ? metaFormSettings.type.value
      : baseSettings.type,
    signalType: metaFormSettings.signalType.value
      ? metaFormSettings.signalType.value
      : baseSettings.signalType,
    ethAddress: metaFormSettings.ethAddress,
    ...baseSettings
  }

  if (!settings.title && !settings.description) {
    settings = {
      title: getNewTitle(settings),
      description: getNewDescription(settings),
      ...settings
    }
  }

  return [settings, metaFormSettings]
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
  isShared = false,
  formChangedCallback,
  openSharedForm = false,
  setOpenSharedForm
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

  const [settings, metaForm] = mapFormSettings(
    mapTriggerToFormProps(stateTrigger),
    metaFormSettings
  )

  return (
    <div className={styles.wrapper}>
      {!openSharedForm && (
        <TriggerForm
          setTitle={setTitle}
          id={stateTrigger.id}
          isShared={isShared}
          metaFormSettings={metaForm}
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onRemovedSignal={close}
          formChangedCallback={formChangedCallback}
        />
      )}

      {openSharedForm && (
        <SharedTriggerForm
          id={stateTrigger.id}
          trigger={stateTrigger}
          onOpen={setOpenSharedForm}
          onCreate={handleSettingsChange}
          settings={settings}
        />
      )}
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
