import React from 'react'
import Button from '@santiment-network/ui/Button'
import AlertStepsSelector from '../AlertStepsSelector/AlertStepsSelector'
import StepsContent from './StepsContent/StepsContent'
import styles from './AlertModalContent.module.scss'

function AlertModalContent ({
  selectedStep,
  selectedType,
  setSelectedStep,
  isMetricsDisabled,
  handleSubmit,
  visitedSteps,
  setVisitedSteps
}) {
  if (selectedStep !== undefined) {
    return (
      <div className={styles.wrapper}>
        <StepsContent selectedStep={selectedStep} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <AlertStepsSelector
        visitedSteps={visitedSteps}
        setVisitedSteps={setVisitedSteps}
        items={selectedType.steps}
        selectedType={selectedType}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
        isMetricsDisabled={isMetricsDisabled}
      />
      <Button
        variant='fill'
        border={false}
        accent='positive'
        className={styles.submit}
        onClick={handleSubmit}
      >
        Create alert
      </Button>
    </div>
  )
}

export default AlertModalContent
