import React from 'react'
import cx from 'classnames'
import { ProLabel } from '../../../components/ProLabel'
import ProPopupWrapper from '../../../components/ProPopup/Wrapper'
import LoginPopup from '../../../components/banners/feature/PopupBanner'
import { useUserWatchlists, useUserScreeners } from '../gql/hooks'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import NewList from '../Actions/New'
import { Plus } from '../../../components/Illustrations/Plus'
import styles from './WatchlistCard.module.scss'

const Trigger = ({ type, showProBanner, ...props }) => {
  return (
    <div
      className={cx(
        styles.wrapper,
        styles.create,
        showProBanner && styles.create__disabled
      )}
      {...props}
    >
      <Plus isDisabled={showProBanner} />
      <div className={styles.createLink}>
        Create {type}
        {showProBanner && <ProLabel className={styles.proLabel} as={'span'} />}
      </div>
    </div>
  )
}

const NewCard = ({ type = 'watchlist' }) => {
  if (type === 'watchlist') {
    return <NewWatchlistCard />
  } else {
    return <NewScreenerCard />
  }
}

const NewWatchlistCard = () => {
  const [watchlists = []] = useUserWatchlists()
  let lists = watchlists

  return (
    <LoginPopup trigger={props => <Trigger type='watchlist' {...props} />}>
      <NewList
        lists={lists}
        trigger={<Trigger type='watchlist' />}
        type='watchlist'
      />
    </LoginPopup>
  )
}

const NewScreenerCard = () => {
  const [screeners = []] = useUserScreeners()
  const { isPro } = useUserSubscriptionStatus()

  return !isPro ? (
    <ProPopupWrapper type='screener'>
      <Trigger showProBanner type='screener' />
    </ProPopupWrapper>
  ) : (
    <NewList
      lists={screeners}
      trigger={<Trigger type='screener' />}
      type='screener'
    />
  )
}

export default NewCard
