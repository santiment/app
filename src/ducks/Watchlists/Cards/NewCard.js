import React from 'react'
import cx from 'classnames'
import { NavLink as Link } from 'react-router-dom'
import NewWatchlist from '../Actions/New'
import { ProLabel } from '../../../components/ProLabel'
import LoginDialogWrapper from '../../../components/LoginDialog/LoginDialogWrapper'
import { useUserWatchlists } from '../gql/hooks'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import NewScreener from '../Actions/New/NewScreener'
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
    <LoginDialogWrapper
      title={`Create watchlist`}
      trigger={props => <Trigger type='watchlist' {...props} />}
    >
      <NewWatchlist
        watchlists={lists}
        trigger={<Trigger type='watchlist' />}
        type='watchlist'
      />
    </LoginDialogWrapper>
  )
}

const NewScreenerCard = () => {
  const { isPro } = useUserSubscriptionStatus()

  return !isPro ? (
    <Link to='/pricing'>
      <Trigger showProBanner type='screener' />
    </Link>
  ) : (
    <NewScreener trigger={<Trigger type='screener' />} />
  )
}

export default NewCard
