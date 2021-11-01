import React from 'react'

import Steps from '../../../../components/Steps/Steps'
import AssetSelector from '../../TypeSteps/AssetSelector/AssetSelector'

import styles from './styles.module.scss'

const AlertModalContent = ({
  currentAlertType,
  selectedStep,
  setSelectedStep
}) => {
  const handleStepClick = step => () => {
    setSelectedStep(step)
  }

  switch (selectedStep) {
    case 0:
      return (
        <div className={styles.content}>
          <AssetSelector />
        </div>
      )
    default:
      return (
        <div className={styles.steps}>
          <Steps initial={0}>
            {currentAlertType.mainSteps.map((item, index) => (
              <Steps.Step
                disabled={selectedStep < index}
                onClick={handleStepClick(index)}
                key={item.label}
                title={item.label}
                description={item.description}
              />
            ))}
          </Steps>
        </div>
      )
  }
}

export default AlertModalContent
