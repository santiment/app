import React from 'react'
import styles from './ColorsExplanation.module.scss'
import { formatProjectTreeMapValue } from './ProjectsTreeMap'

const ColorsExplanation = ({ colors, colorMaps }) => {
  return (
    <div className={styles.container}>
      {colors.map(val => {
        return (
          <div className={styles.card} style={{ 'background-color': val }}>
            {formatProjectTreeMapValue(colorMaps[val])}
          </div>
        )
      })}
    </div>
  )
}

export default ColorsExplanation
