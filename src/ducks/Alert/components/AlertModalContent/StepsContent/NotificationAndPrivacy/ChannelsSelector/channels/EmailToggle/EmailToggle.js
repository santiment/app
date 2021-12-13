import React from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import TriggerChannelSettings from '../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings'
import styles from '../../ChannelsSelector.module.scss'

const EmailToggle = ({ disabled, email, isActive, onChange }) => (
  <div className={cx(styles.inputsRow, disabled && styles.disabled)}>
    <Checkbox
      id='emailChannel'
      disabled={disabled}
      isActive={!disabled && isActive}
      onClick={!disabled ? onChange : null}
    />
    <div className={styles.checkInfo}>
      <div className={styles.labelRow}>
        Email
        <TriggerChannelSettings
          showTrigger={disabled}
          trigger={
            <div className={styles.channelSettingsTrigger}>
              Enable notifications
            </div>
          }
        />
      </div>
      <div>{email}</div>
    </div>
  </div>
)

export default EmailToggle
