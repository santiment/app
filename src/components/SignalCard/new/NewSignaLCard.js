import React from 'react'
import { SvgNew } from '../../Illustrations/NewCard'
import SignalMasterModalForm from '../../../ducks/Signals/signalModal/SignalMasterModalForm'
import styles from './NewSignalCard.module.scss'

const NewSignalCard = () => {
  return (
    <SignalMasterModalForm
      canRedirect={false}
      trigger={
        <div className={styles.wrapper}>
          <SvgNew />
          <div className={styles.createLink}>Create Alert</div>
        </div>
      }
    />
  )
}

export default NewSignalCard
