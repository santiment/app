import React, { useMemo, useState } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PageLoader from '../../components/Loader/PageLoader'
import AlertModalForm from './AlertModalForm'
import { createTrigger, updateTrigger } from '../Signals/common/actions'
import { useSignal } from './hooks/useSignal'
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
  isModalOpen
}) => {
  const [selectedType, setSelectedType] = useState(defaultType)
  const [selectedStep, setSelectedStep] = useState(undefined)
  const [visitedSteps, setVisitedSteps] = useState([])
  const [finishedSteps, setFinishedSteps] = useState([])
  const visitedStepsMemo = useMemo(() => new Set(visitedSteps), [visitedSteps])
  const finishedStepsMemo = useMemo(() => new Set(finishedSteps), [
    finishedSteps
  ])
  const { data = {}, loading } = useSignal({
    id,
    skip: !id
  })

  function handleSubmit (values, { setSubmitting }) {
    if (id) {
      updateAlert({
        id,
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
      setFinishedSteps,
      id
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
      id
    ]
  )

  if (loading) {
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formik => (
        <AlertModalForm
          signal={signalData || (data && data.trigger && data.trigger.trigger)}
          isModalOpen={isModalOpen}
          selectorSettings={selectorSettings}
          setIsEdited={setIsEdited}
          hasSignal={!!id}
          isEdited={isEdited}
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
