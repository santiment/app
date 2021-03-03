import React from 'react'
import { Link } from 'react-router-dom'
import { METRIC_TYPES } from '../../ducks/Signals/utils/constants'
import { getScreenerLink } from '../../ducks/Watchlists/url'
import styles from './ScreenerTriggerDescription.module.scss'

const ScreenerTriggerDescription = ({ trigger, data }) => {
  const {
    settings: { type }
  } = trigger

  if (!data || type !== METRIC_TYPES.SCREENER_SIGNAL) {
    return null
  }

  const {
    added_slugs = [],
    removed_slugs = [],
    operation: { selector: { watchlist_id } = {} } = {}
  } = data

  const link = getScreenerLink({ id: watchlist_id })

  return (
    <div className={styles.description}>
      {added_slugs.length > 0 && (
        <>
          <div>
            Added slugs: <Link to={link}> {added_slugs} </Link>
          </div>
        </>
      )}
      {removed_slugs.length > 0 && (
        <>
          <div>
            Removed slugs: <Link to={link}> {removed_slugs} </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default ScreenerTriggerDescription
