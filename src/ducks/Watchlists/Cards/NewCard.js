import React from 'react'
import cx from 'classnames'
import { ProLabel } from '../../../components/ProLabel'
import ProPopupWrapper from '../../../components/ProPopup/Wrapper'
import LoginPopup from '../../../components/banners/feature/PopupBanner'
import { useUserWatchlists, useUserScreeners } from '../gql/hooks'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import NewWatchlist from '../Actions/New'
import { SvgNew } from '../../../components/Illustrations/NewCard'
import styles from './NewCard.module.scss'
import cardStyles from './Card.module.scss'

const Trigger = ({ type, showProBanner, ...props }) => {
  return (
    <div
      className={cx(
        cardStyles.wrapper,
        styles.create,
        showProBanner && styles.create__disabled
      )}
      {...props}
    >
      <SvgNew isDisabled={showProBanner} />
      <div className={styles.createLink}>
        Create {type}
        {showProBanner && <ProLabel className={styles.proLabel} as={'span'} />}
      </div>
    </div>
  )
}

const NewCard = ({ type = 'watchlist', ...props }) => {
  if (type === 'watchlist') {
    return <NewWatchlistCard {...props} />
  } else {
    return <NewScreenerCard {...props} />
  }
}

const NewWatchlistCard = ({ createWatchlist }) => {
  const [watchlists = []] = useUserWatchlists()

  return (
    <LoginPopup trigger={props => <Trigger type='watchlist' {...props} />}>
      <NewWatchlist
        lists={watchlists}
        trigger={<Trigger type='watchlist' />}
        type='watchlist'
        createWatchlist={createWatchlist}
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
    <NewWatchlist
      lists={screeners}
      trigger={<Trigger type='screener' />}
      type='screener'
    />
  )
}

export default NewCard
