import React from 'react'
import SignalCardsGrid from '../../../components/SignalCard/SignalCardsGrid'
import styles from './../ProfilePage.module.scss'

const PublicSignals = ({ data: signals, userId }) => {
  if (!signals || signals.length === 0) {
    return null
  }

  const signalsWithUser = signals
    .map(signal => ({
      ...signal,
      userId: userId
    }))
    .sort(({ id: idA }, { id: idB }) => idB - idA)

  return (
    <div className={styles.block}>
      <SignalCardsGrid
        signals={signalsWithUser}
        deleteEnabled={false}
        classes={styles}
      />
    </div>
  )
}

export default PublicSignals
