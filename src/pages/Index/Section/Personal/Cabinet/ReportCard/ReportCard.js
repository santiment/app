import React from 'react'
import styles from './ReportCard.module.scss'
import { useUserSubscriptionStatus } from '../../../../../../stores/user/subscriptions'
import { ProLabel } from '../../../../../../components/ProLabel'
import Button from '@santiment-network/ui/Button'

const ReportCard = ({ report: { name, description, url } }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>

        <div className={styles.description}>{description}</div>
      </div>

      <Button
        icon='save'
        disabled={!isPro}
        href={url}
        rel='noopener noreferrer'
        target={isPro ? '_blank' : '_self'}
        as={'a'}
        className={styles.btn}
        classes={{
          btnIcon: !isPro && styles.disabled
        }}
        border
      >
        Download
        {!isPro && <ProLabel className={styles.proLabel} />}
      </Button>
    </div>
  )
}

export default ReportCard
