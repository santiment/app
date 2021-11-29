import React, { useState } from 'react'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import AlertModalSidebar from './components/AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './components/AlertModalContent/AlertModalContent'
import { ALERT_TYPES } from './constants'
import { createTrigger } from '../Signals/common/actions'
import styles from './AlertModalForm.module.scss'

const initialValues = {
  cooldown: '',
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

function AlertModalForm ({ defaultType, createAlert }) {
  const [selectedType, setSelectedType] = useState(defaultType)
  const [selectedStep, setSelectedStep] = useState(undefined)
  const [visitedSteps, setVisitedSteps] = useState([])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit (values) {
      createAlert(values)
    }
  })

  const handleSelectType = type => {
    setSelectedType(type)
    setSelectedStep(undefined)
    formik.resetForm()
  }

  return (
    <div className={styles.wrapper}>
      <AlertModalSidebar
        isMetricsDisabled={true}
        selectedStep={selectedStep}
        selectedType={selectedType}
        setSelectedStep={setSelectedStep}
        onTypeSelect={handleSelectType}
        visitedSteps={visitedSteps}
        setVisitedSteps={setVisitedSteps}
      />
      <AlertModalContent
        isMetricsDisabled={true}
        selectedStep={selectedStep}
        selectedType={selectedType}
        setSelectedStep={setSelectedStep}
        handleSubmit={formik.submitForm}
        visitedSteps={visitedSteps}
        setVisitedSteps={setVisitedSteps}
      />
    </div>
  )
}

AlertModalForm.defaultProps = {
  defaultType: ALERT_TYPES[0]
}

const mapDispatchToProps = dispatch => ({
  createAlert: payload => {
    dispatch(createTrigger(payload))
  }
})

export default connect(null, mapDispatchToProps)(AlertModalForm)
