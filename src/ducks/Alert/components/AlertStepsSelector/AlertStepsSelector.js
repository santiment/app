import React, { useCallback } from 'react'
import { useFormikContext } from 'formik'
import Steps from '../../../../components/Steps/Steps'
import AlertStepDescription from './AlertStepDescription/AlertStepDescription'

const AlertStepsSelector = ({
  size,
  isMetricsDisabled,
  items,
  selectorSettings: {
    selectedStep,
    setSelectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  const { values } = useFormikContext()

  function handleStepClick (stepIndex) {
    setSelectedStep(stepIndex)

    if (!visitedSteps.has(stepIndex)) {
      setVisitedSteps(prev => [...prev, stepIndex])
    }
  }

  const renderSteps = useCallback(() => {
    const hasDisabledStep = items.length !== 3 && isMetricsDisabled

    return items.map((step, index) => {
      const disabled = hasDisabledStep && index === 1

      let status = (visitedSteps.has(index) && 'finish') || 'process'

      if (hasDisabledStep && index === 0) {
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
              status={status}
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
