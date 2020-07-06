import React from 'react'
import { Link } from 'react-router-dom'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import FeedFiltersDdWrapper from './FeedFiltersDdWrapper'
import { useUserWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import styles from './FeedFiltersDdWrapper.module.scss'

const FeedWatchlistsFilter = ({ ids, onUpdate }) => {
  const [watchlists = [], loading] = useUserWatchlists()

  return (
    <FeedFiltersDdWrapper
      title='Watchlist(s)'
      ids={ids}
      onUpdate={onUpdate}
      render={({ onChange, selectedValues, data, setData }) => {
        if (watchlists.length > 0 && !data.length) {
          setData(watchlists)
        }

        return (
          <>
            {loading && <Loader className={styles.loader} />}
            {watchlists.length > 0 ? (
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
                options={watchlists}
              />
            ) : (
              <Link className={styles.link} to='/assets'>
                Create watchlist(s)
              </Link>
            )}
          </>
        )
      }}
    />
  )
}

export default FeedWatchlistsFilter
