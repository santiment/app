import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NewScreener from '../../../ducks/Watchlists/Actions/New/NewScreener'
import { ProLabel } from '../../ProLabel'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from '../Watchlists/WatchlistsEmptySection.module.scss'

const CreateScreenerBtn = ({ className }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <NewScreener
      trigger={
        <Button
          border
          disabled={!isPro}
          className={cx(styles.createBtn, className)}
        >
          Create screener
          {!isPro && <ProLabel className={styles.proLabel} />}
        </Button>
      }
    />
  )
}

export default CreateScreenerBtn
