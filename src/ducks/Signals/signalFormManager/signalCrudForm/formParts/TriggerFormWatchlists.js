import React from 'react'
import { Link } from 'react-router-dom'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import GetWatchlists from '../../../../Watchlists/GetWatchlists'
import styles from '../signal/TriggerForm.module.scss'

const TriggerFormWatchlists = ({ values, setFieldValue }) => {
  const { targetWatchlist } = values
  return (
    <GetWatchlists
      render={({ isWatchlistsLoading, watchlists = [] }) => {
        if (isWatchlistsLoading || watchlists.length > 0) {
          if (
            watchlists &&
            watchlists.length &&
            targetWatchlist &&
            !targetWatchlist.id
          ) {
            const selectedWatchlist = watchlists.find(
              ({ id }) => +id === targetWatchlist.value
            )
            setFieldValue('targetWatchlist', selectedWatchlist)
          }

          return (
            <FormikSelect
              isLoading={isWatchlistsLoading}
              name='targetWatchlist'
              placeholder='Pick an watchlist'
              required
              valueKey='id'
              isClearable={false}
              labelKey='name'
              options={watchlists}
            />
          )
        } else {
          return (
            <Link className={styles.createWatchlist} to='/assets'>
              Create watchlist
            </Link>
          )
        }
      }}
    />
  )
}

export default TriggerFormWatchlists
