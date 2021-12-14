import React from 'react'
import SourceToggle from '../SourceToggle'
import TriggerChannelSettings from '../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'
import styles from '../../ChannelsSelector.module.scss'

const PushToggle = ({
  disabled,
  checkPushAvailability,
  isActive,
  onChange
}) => (
  <SourceToggle
    disabled={disabled}
    isActive={isActive}
    onChange={onChange}
    label={
      <>
        Push
        <TriggerChannelSettings
          showTrigger={disabled}
          recheckBrowserNotifications={checkPushAvailability}
          trigger={
            <div className={styles.channelSettingsTrigger}>
              Enable notifications
            </div>
          }
        />
      </>
    }
  >
    Get fast notifications
  </SourceToggle>
)

export default PushToggle
