import React from 'react'
import SignalCardsGrid from '../../../components/SignalCard/SignalCardsGrid'
import styles from './../ProfilePage.module.scss'

const PublicSignals = ({ data: signals, userId }) => {
  if (!signals || signals.length === 0) {
    return null
  }

  const signalsWithUser = signals.map(signal => ({
    ...signal,
    userId: userId
  }))

  return (
    <div className={styles.block}>
      <div className={styles.title}>Public signals ({signals.length})</div>
      <div>
        <SignalCardsGrid signals={signalsWithUser} deleteEnabled={false} />
      </div>
    </div>
  )
}

export default PublicSignals
