import React, { useState } from 'react'
import cx from 'classnames'
import Select from '@santiment-network/ui/Search/Select/Select'
import '../../../components/formik-santiment-ui/FormikSelect.scss'
import styles from './FeedSorters.module.scss'

export const NEWEST_FILTER = {
  label: 'Newest',
  type: 'DATETIME'
}

export const VOTES_FILTER = {
  label: 'Votes',
  type: 'VOTES'
}

export const COMMENTS_FILTER = {
  label: 'Comments',
  type: 'COMMENTS'
}

export const AUTHOR_FILTER = {
  label: 'Author',
  type: 'AUTHOR'
}

export const FILTER_OPTIONS = [
  NEWEST_FILTER,
  VOTES_FILTER,
  COMMENTS_FILTER,
  AUTHOR_FILTER
]

const FeedSorters = ({ onChangeFilter, className }) => {
  const [filterValue, setFilterValue] = useState(NEWEST_FILTER)

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.select}>
        <Select
          className='select__container-single'
          clearable={false}
          value={filterValue}
          options={FILTER_OPTIONS}
          onChange={value => {
            onChangeFilter && onChangeFilter(value)
            setFilterValue(value)
          }}
        />
      </div>
    </div>
  )
}

export default FeedSorters
