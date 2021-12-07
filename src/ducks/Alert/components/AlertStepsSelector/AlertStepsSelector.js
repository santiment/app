import React, { useCallback } from 'react'
import { useFormikContext } from 'formik'
import Steps from '../../../../components/Steps/Steps'
import AlertStepDescription from './AlertStepDescription/AlertStepDescription'

function AlertStepsSelector ({
  size,
  isMetricsDisabled,
  items,
  selectorSettings: {
    selectedStep,
    setSelectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) {
  const { values } = useFormikContext()

  const handleStepClick = stepIndex => {
    setSelectedStep(stepIndex)

    if (!visitedSteps.includes(stepIndex)) {
      setVisitedSteps(prev => [...prev, stepIndex])
    }
  }

  const renderSteps = useCallback(() => {
    return items.map((step, index) => {
      const disabled = items.length !== 3 && isMetricsDisabled && index === 1

      let status = (visitedSteps.includes(index) && 'finish') || 'process'

      if (items.length !== 3 && isMetricsDisabled && index === 0) {
        status = 'process'
      }

      return (
        <Steps.Step
          status={status}
          disabled={disabled}
          key={step.label}
          title={step.label}
          description={
            <AlertStepDescription
              size={size}
              description={step.description}
              values={values}
              type={step.label}
            />
          }
          onStepClick={() => handleStepClick(index)}
        />
      )
    })
  }, [visitedSteps, items, isMetricsDisabled])

  return (
    <Steps initial={0} current={selectedStep} size={size}>
      {renderSteps()}
    </Steps>
  )
}

export default AlertStepsSelector
