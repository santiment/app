import React, { useState, useEffect, useCallback } from 'react'
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
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import SignalCard from '../../../../components/SignalCard/card/SignalCard'
import styles from '../signalCrudForm/signal/TriggerForm.module.scss'

const mapFormSettings = (baseSettings, meta) => {
  const formMetric =
    meta && meta.metric ? meta.metric.value.value : PRICE_PERCENT_CHANGE

  const metaFormSettings = {
    ...DEFAULT_FORM_META_SETTINGS,
    ethAddress: baseSettings.ethAddress,
    ...meta
  }

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

const getFormData = (stateTrigger, metaFormSettings) =>
  mapFormSettings(mapTriggerToFormProps(stateTrigger), metaFormSettings)

const SignalMaster = ({
  canRedirect = true,
  trigger: { trigger: propsTrigger = {}, userId } = {},
  metaFormSettings,
  setTitle,
  onClose,
  redirect,
  updateTrigger,
  createTrigger,
  isShared = false,
  formChangedCallback,
  openSharedForm = false,
  setOpenSharedForm,
  toggleAnon,
  isLoggedIn
}) => {
  const [stateTrigger, setStateTrigger] = useState({
    title: '',
    description: '',
    isActive: true,
    isPublic: false,
    ...propsTrigger
  })

  const [formData, setFormData] = useState(
    getFormData(stateTrigger, metaFormSettings)
  )

  useEffect(
    () => {
      if (propsTrigger.id && !stateTrigger.id) {
        setStateTrigger({
          ...propsTrigger
        })
      }
    },
    [propsTrigger, stateTrigger.id]
  )

  useEffect(
    () => {
      setFormData(getFormData(stateTrigger, metaFormSettings))
    },
    [stateTrigger, metaFormSettings]
  )

  const handleSettingsChange = useCallback(
    formProps => {
      const data = mapFormPropsToTrigger(formProps, stateTrigger)
      const { id } = data

      if (id > 0 && !isShared) {
        updateTrigger(data)
      } else {
        delete data.id
        createTrigger(data)
      }

      onClose && onClose()
      canRedirect && redirect && redirect()
    },
    [
      stateTrigger,
      updateTrigger,
      isShared,
      createTrigger,
      onClose,
      canRedirect,
      redirect,
      mapFormPropsToTrigger
    ]
  )

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
          onOpen={data => (isLoggedIn ? setOpenSharedForm(data) : toggleAnon())}
          onCreate={() =>
            isLoggedIn ? handleSettingsChange(settings) : toggleAnon()
          }
          settings={settings}
          originalTrigger={propsTrigger}
          userId={userId}
          SignalCard={SignalCard}
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

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(SignalMaster)
