import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AlertStepsSelector from '../AlertStepsSelector/AlertStepsSelector'
import Tip from './Tip/Tip'
import { ALERT_TYPES } from '../../constants'
import styles from './AlertModalSidebar.module.scss'

function AlertModalSidebar ({
  selectedStep,
  selectedType,
  setSelectedStep,
  isMetricsDisabled,
  onTypeSelect,
  visitedSteps,
  setVisitedSteps
}) {
  const [openedSteps, setOpenedSteps] = useState([])

  useEffect(() => {
    setOpenedSteps([])
  }, [selectedType])

  if (selectedStep !== undefined) {
    return (
      <div className={styles.wrapper}>
        <div>
          <Button
            className={styles.backButton}
            onClick={() => setSelectedStep(undefined)}
          >
            <Icon type='pointer-right' /> Type of alert
          </Button>
          <div className={styles.steps}>
            <AlertStepsSelector
              items={selectedType.subSteps}
              size='small'
              selectedType={selectedType}
              selectedStep={selectedStep}
              setSelectedStep={setSelectedStep}
              isMetricsDisabled={isMetricsDisabled}
              visitedSteps={visitedSteps}
              setVisitedSteps={setVisitedSteps}
            />
          </div>
        </div>
        {selectedType.steps[selectedStep].tips && (
          <Tip
            openedSteps={openedSteps}
            setOpenedSteps={setOpenedSteps}
            selectedStep={selectedStep}
            tips={selectedType.steps[selectedStep].tips}
          />
        )}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div>
        {ALERT_TYPES.map(type => (
          <div
            key={type.title}
            className={cx(
              styles.type,
              selectedType.title === type.title && styles.active
            )}
            onClick={() => onTypeSelect(type)}
          >
            {type.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertModalSidebar
