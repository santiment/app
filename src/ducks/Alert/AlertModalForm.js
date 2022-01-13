import React, { useEffect, useState } from 'react'
import { Form } from 'formik'
import isEqual from 'lodash.isequal'
import AlertModalSidebar from './components/AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './components/AlertModalContent/AlertModalContent'
import { useUpdateFinishedSteps } from './hooks/useUpdateFinishedSteps'
import { useUpdateNameAndDescription } from './hooks/useUpdateNameAndDescription'
import { ALERT_TYPES } from './constants'
import styles from './AlertModalForm.module.scss'

const AlertModalForm = ({
  selectorSettings,
  values,
  setValues,
  setIsEdited,
  initialValues,
  hasSignal,
  signal,
  isEdited,
  isModalOpen
}) => {
  const [formValues, setFormValues] = useState(initialValues)
  const {
    setSelectedType,
    setSelectedStep,
    selectedType,
    visitedSteps,
    setVisitedSteps,
    finishedSteps,
    setFinishedSteps,
    selectedStep
  } = selectorSettings

  useUpdateFinishedSteps({
    selectedType,
    visitedSteps,
    finishedSteps,
    setFinishedSteps,
    values,
    isModalOpen
  })
  useUpdateNameAndDescription({
    selectedType,
    selectedStep,
    values,
    hasSignal,
    isEdited
  })

  useEffect(() => {
    if (!isEqual(formValues, values)) {
      setIsEdited(true)
    }

    return () => {
      setIsEdited(false)
    }
  }, [values])

  useEffect(() => {
    if (signal) {
      const channel = signal.settings.channel
      const channelSetting = Array.isArray(channel) ? channel : [channel]

      setSelectedType(
        ALERT_TYPES.find((item, index) => {
          if (signal.settings.type === 'metric_signal') {
            if (signal.settings.target.slug) {
              return index === 0
            }
            if (signal.settings.target.watchlist_id) {
              return index === 1
            }
          }
          return item.settings.type === signal.settings.type
        })
      )

      if (signal.id) {
        setValues({
          ...signal,
          settings: { ...signal.settings, channel: channelSetting }
        })
        setFormValues({
          ...signal,
          settings: { ...signal.settings, channel: channelSetting }
        })
      } else {
        setValues({
          ...initialValues,
          ...signal,
          settings: { ...signal.settings, channel: channelSetting }
        })
        setFormValues({
          ...initialValues,
          ...signal,
          settings: { ...signal.settings, channel: channelSetting }
        })
      }
    }

    return () => {
      setValues(initialValues)
      setFormValues(initialValues)
    }
  }, [signal])

  function handleSelectType (type) {
    setSelectedType(type)
    setSelectedStep(undefined)
    setFinishedSteps([])
    setVisitedSteps([])
    setValues({ ...initialValues, settings: type.settings })
  }

  let isMetricsDisabled
  const hasTarget = values.settings.target

  switch (selectedType.title) {
    case 'Asset':
      const slug = hasTarget && values.settings.target.slug

      isMetricsDisabled =
        typeof slug === 'string' ? !slug : slug && slug.length === 0
      break
    case 'Watchlist':
      const watchlist = hasTarget && values.settings.target.watchlist_id

      isMetricsDisabled = !watchlist
      break
    case 'Screener':
      const screener =
        values.settings.operation.selector &&
        values.settings.operation.selector.watchlist_id

      isMetricsDisabled = !screener
      break
    default:
      isMetricsDisabled = false
  }

  return (
    <Form className={styles.wrapper}>
      <AlertModalSidebar
        isMetricsDisabled={isMetricsDisabled}
        selectorSettings={selectorSettings}
        onTypeSelect={handleSelectType}
      />
      <AlertModalContent
        isMetricsDisabled={isMetricsDisabled}
        selectorSettings={selectorSettings}
      />
    </Form>
  )
}

export default AlertModalForm
