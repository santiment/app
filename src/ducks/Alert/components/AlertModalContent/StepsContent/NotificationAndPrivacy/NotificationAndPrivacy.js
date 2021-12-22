import React from 'react'
import { useFormikContext } from 'formik'
import AlertMessage from '../../../../../../components/Alert/AlertMessage'
import StepTitle from '../StepTitle/StepTitle'
import Block from '../Block/Block'
import NextStep from '../NextStep/NextStep'
import ChannelsSelector from './ChannelsSelector/ChannelsSelector'
import FrequencySelector from './FrequencySelector/FrequencySelector'
import PrivacySelector from './PrivacySelector/PrivacySelector'
import styles from './NotificationAndPrivacy.module.scss'

const NotificationAndPrivacy = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  const { values } = useFormikContext()

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
      {values.settings.channel.length === 0 && (
        <AlertMessage
          className={styles.warning}
          warning
          text='You must setup notification channel to create an alert'
        />
      )}
      <Block label='Alert action' className={styles.actionBlock}>
        <ChannelsSelector />
      </Block>
      <Block
        label='Frequency of notifications'
        className={styles.frequencyBlock}
      >
        <FrequencySelector />
      </Block>
      <Block label='Privacy settings' className={styles.privacyBlock}>
        <PrivacySelector />
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
