import React from 'react'
import StepTitle from '../StepTitle/StepTitle'
import Block from '../Block/Block'
import NextStep from '../NextStep/NextStep'
import FrequencySelector from './FrequencySelector/FrequencySelector'
import styles from './NotificationAndPrivacy.module.scss'

const NotificationAndPrivacy = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  function handleNextClick () {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1])
    }
  }

  return (
    <div className={styles.wrapper}>
      <StepTitle
        iconType='settings'
        title='Notification & Privacy settings'
        className={styles.title}
      />
      <Block label='Alert action' className={styles.actionBlock} />
      <Block
        label='Frequency of notifications'
        className={styles.frequencyBlock}
      >
        <FrequencySelector />
      </Block>
      <NextStep
        onClick={handleNextClick}
        label='Name & Description'
        className={styles.nextBtn}
      />
    </div>
  )
}

export default NotificationAndPrivacy
