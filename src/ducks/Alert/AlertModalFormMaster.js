import React, { useEffect, useMemo, useState } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import PageLoader from '../../components/Loader/PageLoader'
import AlertTypeSelector from './components/AlertTypeSelector/AlertTypeSelector'
import EmptySection from '../../components/EmptySection/EmptySection'
import AlertPreview from './components/AlertPreview/AlertPreview'
import AlertModalForm from './AlertModalForm'
import { createTrigger, updateTrigger } from '../Signals/common/actions'
import { useUser } from '../../stores/user'
import { useSignal } from './hooks/useSignal'
import { validateFormSteps } from './utils'
import styles from './AlertModalFormMaster.module.scss'

const initialValues = {
  cooldown: '1d',
  description: '',
  iconUrl: '',
  isActive: true,
  isPublic: false,
  isRepeating: true,
  settings: {
    type: 'metric_signal',
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
  setIsEdited,
  isEdited,
  signalData,
  id,
  isModalOpen,
  isPreview,
  setIsPreview,
  prepareAlertTitle
}) => {
  const [formPreviousValues, setFormPreviousValues] = useState(initialValues)
  const [selectedType, setSelectedType] = useState(defaultType)
  const [initialState, setInitialState] = useState(initialValues)
  const [selectedStep, setSelectedStep] = useState(undefined)
  const [visitedSteps, setVisitedSteps] = useState([])
  const [finishedSteps, setFinishedSteps] = useState([])
  const [invalidSteps, setInvalidSteps] = useState([])
  const visitedStepsMemo = useMemo(() => new Set(visitedSteps), [visitedSteps])
  const invalidStepsMemo = useMemo(() => new Set(invalidSteps), [invalidSteps])
  const finishedStepsMemo = useMemo(() => new Set(finishedSteps), [
    finishedSteps
  ])
  const { user } = useUser()
  const { data = {}, loading, error } = useSignal({
    id,
    skip: !id
  })

  const isSharedTrigger =
    data && data.trigger && +data.trigger.authorId !== +user.id

  useEffect(() => {
    if (id || signalData) {
      setSelectedStep(0)
    }
  }, [id, signalData])

  useEffect(() => {
    if (!isEqual(formPreviousValues, initialState)) {
      setIsEdited(true)
    } else {
      setIsEdited(false)
    }

    if (!isModalOpen) {
      setIsEdited(false)
    }
  }, [formPreviousValues, isModalOpen])

  function submitFormValues ({ values, setSubmitting }) {
    const triggerValues = {
      ...values,
      settings: { ...values.settings, type: selectedType.settings.type }
    }

    // cannot use daily metrics in the metric_signal, you need to use the daily_metric_signal
    if (
      triggerValues.cooldown === '1d' &&
      triggerValues.settings.type === 'metric_signal'
    ) {
      triggerValues.settings.type = 'daily_metric_signal'
    }

    if (id && !isSharedTrigger) {
      updateAlert({
        id,
        ...triggerValues
      })
    } else {
      createAlert(triggerValues)
    }
    setSubmitting(false)
    handleCloseDialog()
  }

  function handleSubmit (values, { setSubmitting }) {
    validateFormSteps({
      type: selectedType,
      values,
      setInvalidSteps,
      submitForm: () => submitFormValues({ values, setSubmitting })
    })
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
      setFinishedSteps,
      id,
      initialState,
      setInitialState,
      formPreviousValues,
      setFormPreviousValues,
      invalidStepsMemo,
      setInvalidSteps
    }),
    [
      selectedType,
      setSelectedType,
      selectedStep,
      setSelectedStep,
      visitedStepsMemo,
      setVisitedSteps,
      finishedStepsMemo,
      setFinishedSteps,
      id,
      initialState,
      setInitialState,
      formPreviousValues,
      setFormPreviousValues,
      invalidStepsMemo,
      setInvalidSteps
    ]
  )

  if (loading) {
    return (
      <PageLoader
        containerClass={styles.loaderWrapper}
        className={styles.loader}
      />
    )
  }

  if (error) {
    return (
      <EmptySection className={styles.notSignalInfo}>
        Alert doesn't exist
        <br />
        or it's a private alert.
      </EmptySection>
    )
  }

  if (isPreview) {
    return (
      <AlertPreview
        setIsPreview={setIsPreview}
        signal={data.trigger.trigger}
        prepareAlertTitle={prepareAlertTitle}
        handleCloseDialog={handleCloseDialog}
      />
    )
  }

  if (selectedStep === undefined) {
    return <AlertTypeSelector selectorSettings={selectorSettings} />
  }

  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {formik => (
        <AlertModalForm
          signal={signalData || (data && data.trigger && data.trigger.trigger)}
          isModalOpen={isModalOpen}
          selectorSettings={selectorSettings}
          hasSignal={!!id}
          isEdited={isEdited}
          isSharedTrigger={isSharedTrigger}
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
