import React from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import TriggerChannelSettings from '../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'
import styles from '../../ChannelsSelector.module.scss'

const PushToggle = ({
  disabled,
  checkPushAvailability,
  isActive,
  onChange
}) => (
  <div className={cx(styles.inputsRow, disabled && styles.disabled)}>
    <Checkbox
      id='pushChannel'
      disabled={disabled}
      isActive={!disabled && isActive}
      onClick={!disabled ? onChange : null}
    />
    <div className={styles.checkInfo}>
      <div className={styles.labelRow}>
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
      </div>
      <div>Get fast notifications</div>
    </div>
  </div>
)

export default PushToggle
