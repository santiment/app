import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, updateTrigger } from '../../common/actions'
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

const getFormData = (stateTrigger, metaFormSettings) => {
  return mapFormSettings(mapTriggerToFormProps(stateTrigger), metaFormSettings)
}

const SignalMaster = ({
  canRedirect = true,
  trigger: { trigger: propsTrigger } = {},
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
  const [stateTrigger, setStateTrigger] = useState({
    title: '',
    description: '',
    isActive: true,
    isPublic: false,
    ...(propsTrigger || {})
  })

  const [formData, setFormData] = useState(
    getFormData(stateTrigger, metaFormSettings)
  )

  useEffect(
    () => {
      if (propsTrigger && !stateTrigger.id) {
        setStateTrigger({
          ...propsTrigger
        })
      }
    },
    [propsTrigger]
  )

  useEffect(
    () => {
      setFormData(getFormData(stateTrigger, metaFormSettings))
    },
    [stateTrigger, metaFormSettings]
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

  const [settings, metaForm] = formData

  return (
    <div className={cx(styles.wrapper, openSharedForm && styles.sharedForm)}>
      {!openSharedForm && (
        <TriggerForm
          setTitle={setTitle}
          id={stateTrigger.id}
          isShared={isShared}
          metaFormSettings={metaForm}
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onRemovedSignal={onClose || redirect}
          formChangedCallback={formChangedCallback}
        />
      )}
      {openSharedForm && (
        <SharedTriggerForm
          id={stateTrigger.id}
          trigger={stateTrigger}
          onOpen={setOpenSharedForm}
          onCreate={() => handleSettingsChange(settings)}
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
