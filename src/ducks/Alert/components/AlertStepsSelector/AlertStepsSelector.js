import React, { useCallback } from 'react'
import { useFormikContext } from 'formik'
import Steps from '../../../../components/Steps/Steps'
import AlertStepDescription from './AlertStepDescription/AlertStepDescription'
import { validateFormSteps } from '../../utils'

const AlertStepsSelector = ({
  isMetricsDisabled,
  items,
  selectorSettings: {
    selectedType,
    selectedStep,
    setSelectedStep,
    visitedSteps,
    setVisitedSteps,
    finishedSteps,
    invalidStepsMemo,
    setInvalidSteps,
  },
}) => {
  const { values } = useFormikContext()
  const hasDisabledStep = items.length !== 3 && isMetricsDisabled

  function handleStepClick(stepIndex) {
    setSelectedStep(stepIndex)

    if (stepIndex > 0) {
      validateFormSteps({
        stepIndex,
        values,
        type: selectedType,
        setInvalidSteps,
        onlyValidate: true,
      })
    }

    if (!visitedSteps.has(stepIndex)) {
      if (!(hasDisabledStep && stepIndex === 1)) {
        setVisitedSteps((prev) => [...prev, stepIndex])
      }
    }
  }

  const renderSteps = useCallback(
    () =>
      items.map((step, index) => {
        const disabled = hasDisabledStep && index === 1

        let status = 'process'

        if (visitedSteps.has(index)) {
          status = 'visited'
        }

        if (finishedSteps.has(index)) {
          status = 'finish'
        }

        return (
          <Steps.Step
            selected={index === selectedStep}
            status={status}
            disabled={disabled}
            key={step.label}
            title={step.label}
            description={
              <AlertStepDescription
                description={step.description}
                type={step.label}
                status={status}
                selectedType={selectedType}
                invalidStepsMemo={invalidStepsMemo}
                selected={index === selectedStep}
                isFinished={status === 'finish'}
              />
            }
            onStepClick={() => handleStepClick(index)}
          />
        )
      }),
    [
      visitedSteps,
      items,
      isMetricsDisabled,
      values,
      hasDisabledStep,
      finishedSteps,
      selectedStep,
      invalidStepsMemo,
    ],
  )

  return (
    <Steps initial={0} current={selectedStep}>
      {renderSteps()}
    </Steps>
  )
}

export default AlertStepsSelector
