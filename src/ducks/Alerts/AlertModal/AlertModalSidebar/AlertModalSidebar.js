import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'

import Steps from '../../../../components/Steps/Steps'

import { ALERT_TYPES } from '../../constants'

import styles from './styles.module.scss'

const AlertModalSidebar = ({
  currentAlertType,
  selectedStep,
  setSelectedStep,
  onChange
}) => {
  const [selectedType, setSelectedType] = useState(currentAlertType)

  const handleSelectType = type => () => {
    setSelectedType(type)
    onChange(type)
  }

  const handleClickBack = () => {
    setSelectedStep(undefined)
  }

  if (selectedStep === undefined) {
    return (
      <div className={styles.sidebar}>
        {ALERT_TYPES.map(type => (
          <div
            key={type.title}
            onClick={handleSelectType(type)}
            className={cx(
              styles.type,
              selectedType.title === type.title && styles.activeType
            )}
          >
            {type.title}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <Button onClick={handleClickBack} className={styles.backButton}>
        <Icon type='pointer-right' /> Type of alert
      </Button>
      <div className={styles.smallStepSelector}>
        <Steps size='small' initial={0} current={selectedStep}>
          {currentAlertType.subSteps.map((item, index) => (
            <Steps.Step key={item.label} title={item.label} />
          ))}
        </Steps>
      </div>
    </div>
  )
}

export default AlertModalSidebar
