import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Infographics from '../../Watchlist/Infographics'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import Share from '../../../ducks/Watchlists/Actions/Share'
import BaseActions from '../../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import styles from '../index.module.scss'

const Actions = ({ watchlist, isAuthor }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <>
      <BaseActions
        {...watchlist}
        watchlist={watchlist}
        isAuthor={isAuthor}
        isPro={isPro}
      />

      <Button variant='flat' className={cx(styles.left)} icon='view-option'>
        Infographics
      </Button>

      <div className={styles.divider} />

      <Share watchlist={watchlist} isAuthor={isAuthor} />
    </>
  )
}

export default Actions
