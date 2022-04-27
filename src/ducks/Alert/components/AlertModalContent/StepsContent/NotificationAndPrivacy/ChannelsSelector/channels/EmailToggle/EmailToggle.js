import React from 'react'
import SourceToggle from '../SourceToggle'
import TriggerChannelSettings from '../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'
import styles from '../../ChannelsSelector.module.scss'

const EmailToggle = ({ disabled, email, isActive, onChange }) => (
  <SourceToggle
    label={
      <>
        Email
        <TriggerChannelSettings
          showTrigger={disabled}
          trigger={<div className={styles.channelSettingsTrigger}>Enable notifications</div>}
        />
      </>
    }
    disabled={disabled}
    onChange={onChange}
    isActive={isActive}
  >
    {email}
  </SourceToggle>
)

export default EmailToggle
