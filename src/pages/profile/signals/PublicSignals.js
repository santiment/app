import React from 'react'
import SignalCardsGrid from '../../../components/SignalCard/SignalCardsGrid'
import NoEntries from '../../../components/EmptySection/NoEntries'
import AlertModal from '../../../ducks/Alert/AlertModal'
import styles from './../ProfilePage.module.scss'

const PublicSignals = ({ data: signals, userId, isOwner }) => {
  if (!signals || signals.length === 0) {
    return (
      <NoEntries
        maxWidth='358px'
        title={isOwner && 'No Alerts yet'}
        desc={
          isOwner
            ? 'Start to add alerts you want to track or are just interested in'
            : "This user doesn't have any alerts yet"
        }
      >
        {isOwner && <AlertModal trigger={<span className='btn-1 body-3'>Create alert</span>} />}
      </NoEntries>
    )
  }

  const signalsWithUser = signals
    .map((signal) => ({
      ...signal,
      userId: userId,
    }))
    .sort(({ id: idA }, { id: idB }) => idB - idA)

  return (
    <div className={styles.block}>
      <SignalCardsGrid signals={signalsWithUser} deleteEnabled={false} classes={styles} />
    </div>
  )
}

export default PublicSignals
