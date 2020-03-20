import React from 'react'
import cx from 'classnames'
import Select from '@santiment-network/ui/Search/Select/Select'
import styles from './FeedSorters.module.scss'
import './FeedSortersCustom.scss'

export const DATETIME_SORT = {
  label: 'Newest',
  type: 'DATETIME'
}

export const VOTES_SORT = {
  label: 'Popular',
  type: 'VOTES'
}

export const COMMENTS_SORT = {
  label: 'Comments',
  type: 'COMMENTS'
}

export const FILTER_OPTIONS = [
  DATETIME_SORT,
  VOTES_SORT
  // COMMENTS_SORT, #GarageInc: temporary removed before backend San-7187
]

const FeedSorters = ({ sortType, onChangeSort, className }) => {
  return (
    <div className={cx(styles.container, className)}>
      <div className={cx(styles.select, 'filters-sorters')}>
        <Select
          clearable={false}
          value={sortType}
          options={FILTER_OPTIONS}
          onChange={value => {
            onChangeSort && onChangeSort(value)
          }}
        />
      </div>
    </div>
  )
}

export default FeedSorters
