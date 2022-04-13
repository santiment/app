import React from 'react'
import cx from 'classnames'
import Type from './Type/Type'
import AlertRestrictionMessageTooltip from '../AlertRestrictionMessage/AlertRestrictionMessageTooltip'
import { ALERT_TYPES } from '../../constants'
import styles from './AlertTypeSelector.module.scss'

const AlertTypeSelector = ({ selectorSettings, isRestrictedMessageClosed }) => {
  const {
    selectedType,
    setSelectedType,
    setSelectedStep,
    setVisitedSteps,
    setFinishedSteps,
    initialState,
    setInitialState,
    formPreviousValues,
    shouldHideRestrictionMessage,
  } = selectorSettings

  function handleSelectType({ type, isSelected }) {
    setSelectedType(type)
    setSelectedStep(0)

    if (isSelected) {
      setVisitedSteps((prev) => [...prev, 0])
      setInitialState(formPreviousValues)
    } else {
      setFinishedSteps([])
      setVisitedSteps([0])
      setInitialState({ ...initialState, settings: type.settings })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.title, 'row v-center justify')}>
        Choose type of alert bellow:
        <AlertRestrictionMessageTooltip
          isRestrictedMessageClosed={isRestrictedMessageClosed}
          shouldHideRestrictionMessage={shouldHideRestrictionMessage}
        />
      </div>
      <div className={styles.typesWrapper}>
        {ALERT_TYPES.map((type) => {
          const isSelected = selectedType && selectedType.title === type.title
          return (
            <Type
              key={type.title}
              {...type}
              onClick={() => handleSelectType({ type, isSelected })}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AlertTypeSelector
