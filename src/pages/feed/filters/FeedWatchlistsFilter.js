import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import GetWatchlists from '../../../ducks/Watchlists/GetWatchlists'
import styles from './FeedWatchlistsFilter.module.scss'

const FeedWatchlistsFilter = ({ ids, onUpdateWatchlists }) => {
  const [values, setValues] = useState([])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Watchlist(s)</div>
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists = [] }) => {
          if (isWatchlistsLoading) {
            return <Loader className={styles.loader} />
          }

          if (watchlists.length > 0) {
            return (
              <Select
                maxHeight={330}
                classNamePrefix='react-select'
                minimumInput={1}
                onChange={value => {
                  setValues(value)
                  onUpdateWatchlists &&
                    onUpdateWatchlists(value.map(({ id }) => +id))
                }}
                multi={true}
                value={values}
                placeholder='Choose watchlists'
                required
                valueKey='id'
                isClearable={false}
                labelKey='name'
                options={watchlists}
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
    </div>
  )
}

export default FeedWatchlistsFilter
