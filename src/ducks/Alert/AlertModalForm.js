import React, { useEffect } from 'react'
import { Form } from 'formik'
import AlertModalSidebar from './components/AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './components/AlertModalContent/AlertModalContent'
import { useUpdateFinishedSteps } from './hooks/useUpdateFinishedSteps'
import { useUpdateNameAndDescription } from './hooks/useUpdateNameAndDescription'
import styles from './AlertModalForm.module.scss'

const AlertModalForm = ({ selectorSettings, resetForm, values }) => {
  const {
    setSelectedType,
    setSelectedStep,
    selectedType,
    visitedSteps,
    finishedSteps,
    setFinishedSteps,
    selectedStep
  } = selectorSettings

  useUpdateFinishedSteps({
    selectedType,
    visitedSteps,
    finishedSteps,
    setFinishedSteps,
    values
  })
  useUpdateNameAndDescription({ selectedType, selectedStep, values })

  function handleSelectType (type) {
    setSelectedType(type)
    setSelectedStep(undefined)
    resetForm()
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
