import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { useQuery } from 'react-apollo'
import isEqual from 'lodash.isequal'
import PageLoader from '../../components/Loader/PageLoader'
import AlertTypeSelector from './components/AlertTypeSelector/AlertTypeSelector'
import EmptySection from '../../components/EmptySection/EmptySection'
import AlertPreview from './components/AlertPreview/AlertPreview'
import AlertModalForm from './AlertModalForm'
import { createTrigger, updateTrigger } from '../Signals/common/actions'
import { useUser } from '../../stores/user'
import { useSignal } from './hooks/useSignal'
import { getMetricSignalKey, validateFormSteps } from './utils'
import { GET_METRIC_MIN_INTERVAL } from './hooks/queries'
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
  shouldHideRestrictionMessage,
  shouldDisableActions,
  isRecommendedSignal
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
    skip: !id || signalData
  })

  const metric = formPreviousValues.settings.metric
  const { refetch } = useQuery(GET_METRIC_MIN_INTERVAL, {
    variables: {
      metric
    },
    skip: !metric
  })

  const isSharedTrigger =
    (data && data.trigger && +data.trigger.authorId !== +user.id) ||
    (signalData &&
      signalData.trigger &&
      +signalData.trigger.authorId !== +signalData.id)

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

  async function submitFormValues ({ values, setSubmitting }) {
    const triggerValues = {
      ...values,
      settings: { ...values.settings, type: selectedType.settings.type }
    }

    if (selectedType.settings.type === 'metric_signal') {
      const { data } = await refetch({ metric: triggerValues.settings.metric })

      triggerValues.settings.type = getMetricSignalKey(
        data.metric.metadata.minInterval
      )
    }

    if (id && !isSharedTrigger && !isRecommendedSignal) {
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
      setInvalidSteps,
      shouldHideRestrictionMessage
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
      setInvalidSteps,
      shouldHideRestrictionMessage
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
      <EmptySection className={cx(styles.notSignalInfo, 'column hv-center')}>
        Alert doesn't exist
        <br />
        or it's a private alert.
      </EmptySection>
    )
  }

  if (isPreview) {
    return (
      <AlertPreview
        shouldDisableActions={shouldDisableActions}
        setIsPreview={setIsPreview}
        signal={signalData}
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
          isRecommendedSignal={isRecommendedSignal}
          signal={signalData || (data && data.trigger && data.trigger.trigger)}
          isModalOpen={isModalOpen}
          selectorSettings={selectorSettings}
          hasSignal={!!id || signalData}
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
