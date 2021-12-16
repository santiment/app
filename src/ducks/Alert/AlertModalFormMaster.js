import React, { useMemo, useState } from 'react'
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
    type: 'metric_signal',
    metric: '',
    target: { slug: 'bitcoin', watchlist_id: '', word: '', address: '' },
    channel: [],
    time_window: '',
    operation: {}
  },
  tags: [],
  title: ''
}

const AlertModalFormMaster = ({ defaultType, createAlert }) => {
  const [selectedType, setSelectedType] = useState(defaultType)
  const [selectedStep, setSelectedStep] = useState(undefined)
  const [visitedSteps, setVisitedSteps] = useState([])
  const visitedStepsMemo = useMemo(() => new Set(visitedSteps), [visitedSteps])

  function handleSubmit (values, { setSubmitting }) {
    setSubmitting(false)
  }

  const selectorSettings = useMemo(
    () => ({
      selectedType,
      setSelectedType,
      selectedStep,
      setSelectedStep,
      visitedSteps: visitedStepsMemo,
      setVisitedSteps
    }),
    [
      selectedType,
      setSelectedType,
      selectedStep,
      setSelectedStep,
      visitedStepsMemo,
      setVisitedSteps
    ]
  )

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
