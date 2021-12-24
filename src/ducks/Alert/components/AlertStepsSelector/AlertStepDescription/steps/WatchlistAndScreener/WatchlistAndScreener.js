import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import { useWatchlistAndScreener } from '../../../../../hooks/useWatchlistAndScreener'
import styles from './WatchlistAndScreener.module.scss'

const WatchlistAndScreener = ({ selectedType, description, isSmall }) => {
  const { values } = useFormikContext()
  const { watchlist } = useWatchlistAndScreener({
    type: selectedType.title,
    settings: values.settings,
    skip:
      selectedType.title !== 'Screener' && selectedType.title !== 'Watchlist'
  })

  if (!watchlist) {
    return description || ''
  }

  return (
    <div className={cx(styles.wrapper, isSmall && styles.small)}>
      {watchlist.name}
    </div>
  )
}

export default WatchlistAndScreener
