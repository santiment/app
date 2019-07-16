import React from 'react'
import { Link } from 'react-router-dom'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import GetWatchlists from '../../../../Watchlists/GetWatchlists'
import styles from '../signal/TriggerForm.module.scss'
import Label from '@santiment-network/ui/Label'

const TriggerFormWatchlists = () => {
  return (
    <div className={styles.Field}>
      <Label accent='waterloo' className={styles.label}>
        &nbsp;
      </Label>
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
