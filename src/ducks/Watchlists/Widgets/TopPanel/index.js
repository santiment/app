import React from 'react'
// import MarketcapHistory from './MarketcapHistory'
import Actions from './Actions'
import BaseActions from './BaseActions'
import Widgets from './Widgets'
import Share from '../../Actions/Share'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './index.module.scss'

const TopPanel = ({ name, id, watchlist, isAuthor, assets, ...props }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={styles.name}>{name}</h1>
        {isAuthor && (
          <BaseActions
            isAuthor={isAuthor}
            isPro={isPro}
            name={name}
            id={id}
            watchlist={watchlist}
          />
        )}
      </div>
      {/* <MarketcapHistory /> */}
      <div className={styles.right}>
        <Share watchlist={watchlist} isAuthor={isAuthor} />
        <Actions
          isAuthor={isAuthor}
          name={name}
          id={id}
          assets={assets}
          isPro={isPro}
        />
        <Widgets {...props} />
      </div>
    </section>
  )
}

export default TopPanel
