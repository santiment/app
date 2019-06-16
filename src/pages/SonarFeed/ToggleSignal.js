import React from 'react'
import { Toggle } from '@santiment-network/ui'
import styles from './SignalDetails.module.scss'

export const ToggleSignal = ({ isActive, toggleSignal, id }) => (
  <div className={styles.toggleSignal}>
    <span>Signal {isActive ? 'enabled' : 'disabled'}</span>
    <Toggle
      onClick={() => toggleSignal({ id, isActive })}
      isActive={isActive}
    />
  </div>
)
