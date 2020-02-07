import React from 'react'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import styles from './AlertsAndInsightsFilter.module.scss'

export const AUTHOR_TYPES = {
  OWN: 'OWN',
  ALL: 'ALL',
  FOLLOWED: 'FOLLOWED',
  SANFAM: 'SANFAM'
}

const EVENTS_TYPES = [
  {
    label: 'Show all',
    type: AUTHOR_TYPES.ALL
  },
  {
    label: 'Only from Santiment team',
    type: AUTHOR_TYPES.SANFAM
  },
  {
    label: 'Only from people you follow',
    type: AUTHOR_TYPES.FOLLOWED
  }
]

const AlertsAndInsightsFilter = ({ selected, onUpdateAuthor }) => {
  console.log('selected author', selected)

  const toggleSelection = val => {
    const { type } = EVENTS_TYPES.find(({ label }) => label === val)
    onUpdateAuthor && onUpdateAuthor(type)
  }

  const { label: selectedLabel } = EVENTS_TYPES.find(
    ({ type }) => type === selected
  )

  return (
    <div className={styles.container}>
      <div className={styles.title}>Alerts & Insights</div>

      <RadioBtns
        options={EVENTS_TYPES.map(({ label }) => label)}
        labelOnRight
        defaultSelectedIndex={selectedLabel}
        onSelect={toggleSelection}
        labelClassName={styles.radioLabel}
        className={styles.radioBtns}
      />
    </div>
  )
}

export default AlertsAndInsightsFilter
