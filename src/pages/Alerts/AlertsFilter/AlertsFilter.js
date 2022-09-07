import React from 'react'
import cx from 'classnames'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import Filter from '../../../components/Filter/Filter'
import styles from './AlertsFilter.module.scss'

export const filters = {
  ALL: 'all',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
}

const filterOptions = [
  {
    index: filters.ALL,
    content: 'All signals',
  },
  {
    index: filters.ENABLED,
    content: 'Show only enabled',
  },
  {
    index: filters.DISABLED,
    content: 'Show only disabled',
  },
]

const AlertsFilter = ({ onSelect, selectedFilter = 'all', isMobile }) => {
  return (
    <Filter dialogTitle='Filter by' isMobile={isMobile}>
      <div className={styles.filterContent}>
        <RadioBtns
          options={filterOptions}
          labelOnRight
          defaultSelectedIndex={selectedFilter}
          onSelect={onSelect}
          className={cx(styles.filterContent__filterItem, 'body-2')}
        />
      </div>
    </Filter>
  )
}

export default AlertsFilter
