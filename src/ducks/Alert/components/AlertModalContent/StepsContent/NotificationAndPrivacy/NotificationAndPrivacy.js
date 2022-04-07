import React from 'react'
import StepTitle from '../StepTitle/StepTitle'
import Block from '../Block/Block'
import NextStep from '../NextStep/NextStep'
import ChannelsSelector from './ChannelsSelector/ChannelsSelector'
import FrequencySelector from './FrequencySelector/FrequencySelector'
import PrivacySelector from './PrivacySelector/PrivacySelector'
import styles from './NotificationAndPrivacy.module.scss'

const NotificationAndPrivacy = ({
  selectorSettings: { setSelectedStep, selectedStep, visitedSteps, setVisitedSteps },
}) => {
  function handleNextClick() {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps((prev) => [...prev, selectedStep + 1])
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <StepTitle title='Notification & Privacy settings' className={styles.title} />
        <NextStep onClick={handleNextClick} label='Name & Description' />
      </div>
      <Block label='Alert action' className={styles.actionBlock}>
        <ChannelsSelector />
      </Block>
      <Block label='Frequency of notifications' className={styles.frequencyBlock}>
        <FrequencySelector />
      </Block>
      <Block label='Privacy settings' className={styles.privacyBlock}>
        <PrivacySelector />
      </Block>
    </div>
  )
}

export default NotificationAndPrivacy
