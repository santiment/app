import React from 'react'
import { Link } from 'react-router-dom'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import { useUserWatchlists } from '../../../../Watchlists/gql/hooks'
import styles from '../signal/TriggerForm.module.scss'

const TriggerFormWatchlists = ({ values, setFieldValue }) => {
  const { targetWatchlist } = values
  const [watchlists = [], loading] = useUserWatchlists()

  if (
    !loading &&
    watchlists &&
    watchlists.length > 0 &&
    targetWatchlist &&
    !targetWatchlist.id
  ) {
    const selectedWatchlist = watchlists.find(
      ({ id }) => +id === targetWatchlist.value
    )
    setFieldValue('targetWatchlist', selectedWatchlist)
  }

  return loading || watchlists.length > 0 ? (
    <FormikSelect
      isLoading={loading}
      name='targetWatchlist'
      placeholder='Pick an watchlist'
      required
      valueKey='id'
      isClearable={false}
      labelKey='name'
      options={watchlists}
    />
  ) : (
    <Link className={styles.createWatchlist} to='/assets'>
      Create watchlist
    </Link>
  )
}

export default TriggerFormWatchlists
