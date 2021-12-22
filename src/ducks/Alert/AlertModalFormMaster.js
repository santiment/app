import React, { useEffect, useMemo, useState } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import AlertModalForm from './AlertModalForm'
import { ALERT_TYPES } from './constants'
import { createTrigger } from '../Signals/common/actions'

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

const AlertModalFormMaster = ({ defaultType, createAlert, setIsModalOpen }) => {
  const [selectedType, setSelectedType] = useState(defaultType)
  const [selectedStep, setSelectedStep] = useState(undefined)
  const [visitedSteps, setVisitedSteps] = useState([])
  const [finishedSteps, setFinishedSteps] = useState([])
  const visitedStepsMemo = useMemo(() => new Set(visitedSteps), [visitedSteps])
  const finishedStepsMemo = useMemo(() => new Set(finishedSteps), [
    finishedSteps
  ])

  useEffect(() => {
    if (selectedStep === undefined) {
      setVisitedSteps([])
      setFinishedSteps([])
    }
  }, [selectedType])

  function handleSubmit (values, { setSubmitting }) {
    createAlert(values)
    setSubmitting(false)
    setIsModalOpen(false)
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

  const values = useMemo(() => {
    return { ...initialValues, settings: selectedType.settings }
  }, [selectedType])

  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {formik => (
        <AlertModalForm selectorSettings={selectorSettings} {...formik} />
      )}
    </Formik>
  )
}

AlertModalFormMaster.defaultProps = {
  defaultType: ALERT_TYPES[0]
}

const mapDispatchToProps = dispatch => ({
  createAlert: payload => {
    dispatch(createTrigger(payload))
  }
})

export default connect(null, mapDispatchToProps)(AlertModalFormMaster)
