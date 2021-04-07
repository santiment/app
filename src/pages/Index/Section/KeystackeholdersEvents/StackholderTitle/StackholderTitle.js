import React from 'react'
import { ProjectIcon } from '../../../../../components/ProjectIcon/ProjectIcon'
import { useProject } from '../../../../../hooks/project'
import styles from './StackholderTitle.module.scss'

const READABLE_NAMES = {
  large_transactions: 'Large transactions',
  large_exchange_deposit: 'Large Exchange deposit'
}

const StackholderTitle = ({ count, slug, labels }) => {
  const uniqueLabels = [...new Set(labels)]
  const [project] = useProject(slug)

  const { logoUrl, name, ticker } = project

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <ProjectIcon slug={slug} size={20} logoUrl={logoUrl} />

        <div className={styles.name}>{name}</div>

        <div className={styles.ticker}>{ticker}</div>

        <div className={styles.count}>{count}</div>
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
