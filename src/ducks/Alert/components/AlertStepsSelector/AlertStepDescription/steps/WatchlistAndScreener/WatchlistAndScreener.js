import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { useWatchlistAndScreener } from '../../../../../hooks/useWatchlistAndScreener'
import AlertMessage from '../../../../../../../components/Alert/AlertMessage'
import styles from './WatchlistAndScreener.module.scss'

const WatchlistAndScreener = ({
  selectedType,
  description,
  invalidStepsMemo,
  selected,
  isFinished
}) => {
  const { values } = useFormikContext()
  const { watchlist } = useWatchlistAndScreener({
    type: selectedType.title,
    settings: values.settings,
    skip:
      selectedType.title !== 'Screener' && selectedType.title !== 'Watchlist'
  })

  const isInvalid = invalidStepsMemo.has('watchlist')

  useEffect(() => {
    if (watchlist && isInvalid) {
      invalidStepsMemo.delete('watchlist')
    }
  }, [watchlist, isInvalid])

  let children = ''

  if (!watchlist) {
    children = description || ''
  } else {
    children = <div className={styles.wrapper}>{watchlist.name}</div>
  }

  return (
    <div className={styles.col}>
      {(selected || isFinished) && children}
      {isInvalid && (
        <AlertMessage
          className={styles.error}
          error
          text={`${
            selectedType.title === 'Screener' ? 'Screener' : 'Watchlist'
          } is required`}
        />
      )}
    </div>
  )
}

export default WatchlistAndScreener
