import React from 'react'
import { Form } from 'formik'
import AlertModalSidebar from './components/AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './components/AlertModalContent/AlertModalContent'
import styles from './AlertModalFormMaster.module.scss'

function AlertModalForm ({ selectorSettings, resetForm }) {
  const { setSelectedType, setSelectedStep } = selectorSettings

  function handleSelectType (type) {
    setSelectedType(type)
    setSelectedStep(undefined)
    resetForm()
  }

  return (
    <Form className={styles.wrapper}>
      <AlertModalSidebar
        isMetricsDisabled={true}
        selectorSettings={selectorSettings}
        onTypeSelect={handleSelectType}
      />
      <AlertModalContent
        isMetricsDisabled={true}
        selectorSettings={selectorSettings}
      />
    </Form>
  )
}

export default AlertModalForm
