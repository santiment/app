import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AlertStepsSelector from '../AlertStepsSelector/AlertStepsSelector'
import Tip from './Tip/Tip'
import { ALERT_TYPES } from '../../constants'
import styles from './AlertModalSidebar.module.scss'

function AlertModalSidebar ({
  isMetricsDisabled,
  onTypeSelect,
  selectorSettings
}) {
  const [openedSteps, setOpenedSteps] = useState([])

  const { selectedType, selectedStep, setSelectedStep } = selectorSettings

  useEffect(() => {
    setOpenedSteps([])
  }, [selectedType])

  if (selectedStep !== undefined) {
    const tips = selectedType.steps[selectedStep].tips

    return (
      <div className={styles.wrapper}>
        <div>
          <Button
            className={styles.backButton}
            onClick={() => setSelectedStep(undefined)}
          >
            <Icon type='pointer-right' className={styles.backIcon} /> Type of
            alert
          </Button>
          <div className={styles.steps}>
            <AlertStepsSelector
              items={selectedType.subSteps}
              size='small'
              selectorSettings={selectorSettings}
              isMetricsDisabled={isMetricsDisabled}
            />
          </div>
        </div>
        {tips && (
          <Tip
            openedSteps={openedSteps}
            setOpenedSteps={setOpenedSteps}
            selectedStep={selectedStep}
            tips={tips}
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
