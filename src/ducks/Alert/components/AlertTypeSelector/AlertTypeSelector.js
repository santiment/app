import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { track } from 'webkit/analytics'
import Type from './Type/Type'
import AlertTooltip from '../../../../components/AlertTooltip/AlertTooltip'
import { ALERT_TYPES } from '../../constants'
import { AlertsEvents } from '../../analytics'
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
    track.event(AlertsEvents.SetAlertType, { type: type.title })

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
        Choose an alert category bellow:
        <AlertTooltip
          isVisible={!shouldHideRestrictionMessage && isRestrictedMessageClosed}
          content={
            <span>
              <span className='txt-m'>Alert with Duration Restriction.</span> Your Alert will be
              valid for 30 days from the day it’s created. To extend Alert please{' '}
              <Link to='/pricing' className={cx(styles.link, styles.tooltipLink, 'txt-m')}>
                Update your Plan!
              </Link>
            </span>
          }
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
