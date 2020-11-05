import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NewScreener from '../../../ducks/Watchlists/Actions/New'
import { ProLabel } from '../../ProLabel'
import ProPopupWrapper from '../../ProPopup/Wrapper'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from '../Watchlists/WatchlistsEmptySection.module.scss'

const CreateScreenerBtn = ({ className, screeners }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <ProPopupWrapper
      type='screener'
      trigger={props => (
        <Button border className={cx(styles.createBtn, className)} {...props}>
          Create screener
          {!isPro && <ProLabel className={styles.proLabel} />}
        </Button>
      )}
    >
      <NewScreener
        lists={screeners}
        type='screener'
        trigger={
          <Button border className={cx(styles.createBtn, className)}>
            Create screener
            {!isPro && <ProLabel className={styles.proLabel} />}
          </Button>
        }
      />
    </ProPopupWrapper>
  )
}

export default CreateScreenerBtn
