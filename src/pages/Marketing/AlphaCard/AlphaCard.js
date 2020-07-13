import React from 'react'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from './AlphaCard.module.scss'

const AlphaCard = ({ data: { name, description, url } }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <a
          className={styles.title}
          href={isPro ? url : '/pricing'}
          rel='noopener noreferrer'
          target={isPro ? '_blank' : '_self'}
        >
          {name}
        </a>
        <div className={styles.description}>{description}</div>
      </div>

      {isPro && (
        <div className={styles.shareBlock}>
          <ShareModalTrigger
            dialogTitle='Share'
            className={styles.shareBtn}
            shareLink={url}
            border={false}
          />
        </div>
      )}
    </div>
  )
}

export default AlphaCard
