import React from 'react'
import { Link } from 'react-router-dom'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import GetWatchlists from '../../../../Watchlists/GetWatchlists'
import styles from '../signal/TriggerForm.module.scss'

const TriggerFormWatchlists = () => {
  return (
    <div className={styles.Field}>
      <FormikLabel />
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists = [] }) => {
          if (isWatchlistsLoading || watchlists.length > 0) {
            return (
              <FormikSelect
                isLoading={isWatchlistsLoading}
                name='target'
                placeholder='Pick an watchlist'
                required
                simpleValue
                valueKey='id'
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
    </div>
  )
}

export default TriggerFormWatchlists
