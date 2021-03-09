import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import { ProLabel } from '../../ProLabel'
import { SCREENER } from '../../../ducks/Watchlists/detector'
import NewScreener from '../../../ducks/Watchlists/Actions/New'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from '../Watchlists/EmptySection.module.scss'

const CreateScreenerBtn = ({ className }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <NewScreener
      type={SCREENER}
      trigger={
        <Button border className={cx(styles.createBtn, className)}>
          Create screener
          {!isPro && <ProLabel className={styles.proLabel} />}
        </Button>
      }
    />
  )
}

export default CreateScreenerBtn
