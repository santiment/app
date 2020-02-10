import React from 'react'
import { Link } from 'react-router-dom'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import GetWatchlists from '../../../ducks/Watchlists/GetWatchlists'
import FeedFiltersDdWrapper from './FeedFiltersDdWrapper'
import styles from './FeedFiltersDdWrapper.module.scss'

const FeedWatchlistsFilter = ({ ids, onUpdate }) => {
  return (
    <FeedFiltersDdWrapper
      title='Watchlist(s)'
      ids={ids}
      onUpdate={onUpdate}
      render={({ onChange, selectedValues, data, setData }) => {
        return (
          <GetWatchlists
            render={({ isWatchlistsLoading, watchlists: items = [] }) => {
              if (isWatchlistsLoading) {
                return <Loader className={styles.loader} />
              }

              if (items.length > 0) {
                if (!data.length) {
                  setData(items)
                }

                return (
                  <Select
                    maxHeight={330}
                    classNamePrefix='react-select'
                    minimumInput={1}
                    onChange={onChange}
                    multi={true}
                    value={selectedValues}
                    placeholder='Choose watchlists'
                    required
                    valueKey='id'
                    isClearable={false}
                    labelKey='name'
                    options={items}
                  />
                )
              } else {
                return (
                  <Link className={styles.link} to='/assets'>
                    Create watchlist(s)
                  </Link>
                )
              }
            }}
          />
        )
      }}
    />
  )
}

export default FeedWatchlistsFilter
