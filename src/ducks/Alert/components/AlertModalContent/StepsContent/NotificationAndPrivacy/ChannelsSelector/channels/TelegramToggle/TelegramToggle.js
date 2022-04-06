import React from 'react'
import SourceToggle from '../SourceToggle'
import TriggerChannelSettings from '../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'
import styles from '../../ChannelsSelector.module.scss'

const TelegramToggle = ({ disabled, isActive, onChange }) => {
  return (
    <SourceToggle
      disabled={disabled}
      isActive={isActive}
      onChange={onChange}
      label={
        <>
          Telegram
          <TriggerChannelSettings
            showTrigger={disabled}
            trigger={<div className={styles.channelSettingsTrigger}>Enable notifications</div>}
          />
        </>
      }
    >
      You will receive notifications to the connected telegram account
    </SourceToggle>
  )
}

export default TelegramToggle
