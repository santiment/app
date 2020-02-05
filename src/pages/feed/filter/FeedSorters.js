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
  label: 'Votes',
  type: 'VOTES'
}

export const COMMENTS_SORT = {
  label: 'Comments',
  type: 'COMMENTS'
}

export const AUTHOR_SORT = {
  label: 'Author',
  type: 'AUTHOR'
}

export const FILTER_OPTIONS = [
  DATETIME_SORT,
  VOTES_SORT,
  // COMMENTS_SORT, #GarageInc: temporary removed before backend San-7187
  AUTHOR_SORT
]

const FeedSorters = ({ sortType, onChangeSort, className }) => {
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.select}>
        <Select
          clearable={false}
          value={sortType}
          options={FILTER_OPTIONS}
          searchable={false}
          onChange={value => {
            onChangeSort && onChangeSort(value)
          }}
        />
      </div>
    </div>
  )
}

export default FeedSorters
