import React from 'react'
import { Form } from 'formik'
import AlertModalSidebar from './components/AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './components/AlertModalContent/AlertModalContent'
import styles from './AlertModalFormMaster.module.scss'

const AlertModalForm = ({ selectorSettings, resetForm, values }) => {
  const { setSelectedType, setSelectedStep } = selectorSettings

  function handleSelectType (type) {
    setSelectedType(type)
    setSelectedStep(undefined)
    resetForm()
  }

  const slug = values.settings.target.slug
  const isMetricsDisabled = typeof slug === 'string' ? !slug : slug.length === 0

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
