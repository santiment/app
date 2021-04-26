import React from 'react'
import { Label, CollapsedLabels } from '../HistoricalBalance/Address/Labels'
import styles from './index.module.scss'

const Labels = ({ labels }) => {
  if (!labels) {
    return
  }

  const visibleLabels = labels.slice(0, 2)
  const hiddenLabels = labels.slice(2)

  return (
    <div className={styles.labels}>
      {visibleLabels.map(Label)}
      {!!hiddenLabels.length && <CollapsedLabels labels={hiddenLabels} />}
    </div>
  )
}

export default Labels
