import React from 'react'
import Type from './Type/Type'
import { ALERT_TYPES } from '../../constants'
import styles from './AlertTypeSelector.module.scss'

const AlertTypeSelector = ({ selectorSettings }) => {
  const {
    selectedType,
    setSelectedType,
    setSelectedStep,
    setVisitedSteps,
    setFinishedSteps,
    initialState,
    setInitialState,
    formPreviousValues
  } = selectorSettings

  function handleSelectType ({ type, isSelected }) {
    setSelectedType(type)
    setSelectedStep(0)

    if (isSelected) {
      setVisitedSteps(prev => [...prev, 0])
      setInitialState(formPreviousValues)
    } else {
      setFinishedSteps([])
      setVisitedSteps([0])
      setInitialState({ ...initialState, settings: type.settings })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Choose type of alert bellow:</div>
      <div className={styles.typesWrapper}>
        {ALERT_TYPES.map(type => {
          const isSelected = selectedType && selectedType.title === type.title
          return (
            <Type
              key={type.title}
              {...type}
              onClick={() => handleSelectType({ type, isSelected })}
              isSelected={isSelected}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AlertTypeSelector
