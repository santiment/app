import React from 'react'
import { ProjectIcon } from '../../../../../components/ProjectIcon/ProjectIcon'
import { READABLE_NAMES } from '../hooks'
import styles from './StackholderTitle.module.scss'

const StackholderTitle = ({ project, count, slug, labels }) => {
  const uniqueLabels = [...new Set(labels)]

  const { logoUrl, name, ticker } = project || {}

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <ProjectIcon slug={slug} size={20} logoUrl={logoUrl} />

        <div className={styles.name}>{name}</div>

        <div className={styles.ticker}>
          {ticker}
          <div className={styles.count}>{count}</div>
        </div>
      </div>

      <div className={styles.labels}>
        {uniqueLabels.map(l => (
          <div key={l} className={styles.label}>
            {READABLE_NAMES[l] || l}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackholderTitle
