import React from 'react'
import { READABLE_NAMES } from '../hooks'
import styles from './Labels.module.scss'

const CardLabels = ({ labels }) => (
  <div className={styles.labels}>
    {labels.map((label) => (
      <div key={label} className={styles.label}>
        {READABLE_NAMES[label] || label}
      </div>
    ))}
  </div>
)

export default CardLabels
