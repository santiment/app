import React from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import styles from '../ChannelsSelector.module.scss'

const SourceToggle = ({
  isWebhook,
  disabled,
  isActive,
  onChange,
  label,
  children
}) => (
  <div
    className={cx(styles.inputsRow, !isWebhook && disabled && styles.disabled)}
  >
    <Checkbox
      disabled={!isWebhook && disabled}
      isActive={isWebhook ? isActive : !disabled && isActive}
      onClick={isWebhook ? onChange : disabled ? null : onChange}
    />
    <div className={styles.checkInfo}>
      <div className={styles.labelRow}>{label}</div>
      <div>{children}</div>
    </div>
  </div>
)

export default SourceToggle
