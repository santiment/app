import styles from './SignalDetails.module.scss'
import React from 'react'
import { Toggle } from '@santiment-network/ui'

export const ToggleSignal = ({ isActive, toggleSignal, id }) => (
  <div className={styles.toggleSignal}>
    {!isActive && <span>Signal disabled</span>}
    {isActive && <span>Signal enabled</span>}
    <Toggle
      onClick={() => toggleSignal({ id, isActive })}
      isActive={isActive}
    />
  </div>
)
