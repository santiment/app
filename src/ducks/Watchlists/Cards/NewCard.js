import React from 'react'
import cx from 'classnames'
import NewWatchlist from '../Actions/New'
import { ProLabel } from '../../../components/ProLabel'
import ProPopupWrapper from '../../../components/ProPopup/Wrapper'
import { SvgNew } from '../../../components/Illustrations/NewCard'
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../detector'
import LoginPopup from '../../../components/banners/feature/PopupBanner'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from './NewCard.module.scss'
import cardStyles from './Card.module.scss'

const Trigger = ({ title, showProBanner, ...props }) => (
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
      Create {title}
      {showProBanner && <ProLabel className={styles.proLabel} as={'span'} />}
    </div>
  </div>
)

const NewCard = ({ type }) => {
  switch (type) {
    case SCREENER:
      return <NewScreenerCard />
    case BLOCKCHAIN_ADDRESS:
    case PROJECT:
    default:
      return <NewWatchlistCard type={type} />
  }
}

const NewWatchlistCard = ({ type }) => (
  <LoginPopup trigger={props => <Trigger title='watchlist' {...props} />}>
    <NewWatchlist trigger={<Trigger title='watchlist' />} type={type} />
  </LoginPopup>
)

const NewScreenerCard = () => {
  const { isPro } = useUserSubscriptionStatus()

  return !isPro ? (
    <ProPopupWrapper type={SCREENER}>
      <Trigger showProBanner title='screener' />
    </ProPopupWrapper>
  ) : (
    <NewWatchlist trigger={<Trigger title='screener' />} type={SCREENER} />
  )
}

export default NewCard
