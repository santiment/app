import React, { useEffect, useMemo, useState } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PageLoader from '../../components/Loader/PageLoader'
import AlertModalForm from './AlertModalForm'
import { createTrigger, updateTrigger } from '../Signals/common/actions'
import styles from './AlertModalFormMaster.module.scss'

const initialValues = {
  cooldown: '1d',
  description: '',
  iconUrl: '',
  isActive: true,
  isPublic: false,
  isRepeating: true,
  settings: {
    type: '',
    metric: '',
    target: { slug: '' },
    channel: [],
    time_window: '',
    operation: {}
  },
  tags: [],
  title: ''
}

const AlertModalFormMaster = ({
  defaultType,
  createAlert,
  updateAlert,
  handleCloseDialog,
  signal,
  isSignalLoading,
  setIsEdited
}) => {
  const [selectedType, setSelectedType] = useState(defaultType)
  const [selectedStep, setSelectedStep] = useState(undefined)
  const [visitedSteps, setVisitedSteps] = useState([])
  const [finishedSteps, setFinishedSteps] = useState([])
  const visitedStepsMemo = useMemo(() => new Set(visitedSteps), [visitedSteps])
  const finishedStepsMemo = useMemo(() => new Set(finishedSteps), [
    finishedSteps
  ])

  const values = useMemo(() => {
    const signalChannels =
      (signal && signal.settings && signal.settings.channel) || []

    if (signal.id) {
      if (selectedType.settings.type !== signal.settings.type) {
        return {
          id: signal.id,
          isActive: signal.isActive,
          isPublic: signal.isPublic,
          isRepeating: signal.isRepeating,
          ...initialValues,
          settings: selectedType.settings
        }
      }

      return {
        ...signal,
        settings: {
          ...signal.settings,
          channel: Array.isArray(signalChannels) ? signalChannels : []
        }
      }
    }

    const signalSettings = (signal && signal.settings) || {}

    const settings = {
      ...selectedType.settings,
      ...signalSettings,
      channel: signal && Array.isArray(signalChannels) ? signalChannels : []
    }

    return {
      ...initialValues,
      ...signal,
      settings: {
        ...settings
      }
    }
  }, [selectedType, signal])

  useEffect(() => {
    if (defaultType.title !== selectedType.title) {
      setSelectedType(defaultType)
    }
  }, [defaultType])

  useEffect(() => {
    if (selectedStep === undefined) {
      setVisitedSteps([])
      setFinishedSteps([])
    }
  }, [selectedType])

  function handleSubmit (values, { setSubmitting }) {
    if (signal.id) {
      updateAlert({
        ...values,
        settings: { ...values.settings, type: selectedType.settings.type }
      })
    } else {
      createAlert({
        ...values,
        settings: { ...values.settings, type: selectedType.settings.type }
      })
    }
    setSubmitting(false)
    handleCloseDialog()
  }

  const selectorSettings = useMemo(
    () => ({
      selectedType,
      setSelectedType,
      selectedStep,
      setSelectedStep,
      visitedSteps: visitedStepsMemo,
      setVisitedSteps,
      finishedSteps: finishedStepsMemo,
      setFinishedSteps
    }),
    [
      selectedType,
      setSelectedType,
      selectedStep,
      setSelectedStep,
      visitedStepsMemo,
      setVisitedSteps,
      finishedStepsMemo,
      setFinishedSteps
    ]
  )

  if (isSignalLoading) {
    return (
      <div>
        <PageLoader
          containerClass={styles.loaderWrapper}
          className={styles.loader}
        />
      </div>
    )
  }

  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {formik => (
        <AlertModalForm
          selectorSettings={selectorSettings}
          setIsEdited={setIsEdited}
          {...formik}
        />
      )}
    </Formik>
  )
}

const mapDispatchToProps = dispatch => ({
  createAlert: payload => {
    dispatch(createTrigger(payload))
  },
  updateAlert: payload => {
    dispatch(updateTrigger(payload))
  }
})

export default connect(null, mapDispatchToProps)(AlertModalFormMaster)
