import React from 'react'
// import MarketcapHistory from './MarketcapHistory'
import Actions from './Actions'
import Widgets from './Widgets'
import Share from '../../Actions/Share'
// import EditForm from '../../Actions/Edit/EditForm'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './index.module.scss'

const TopPanel = ({ name, id, watchlist, isAuthor, ...props }) => {
  const { isPro } = useUserSubscriptionStatus()
  return (
    <section className={styles.wrapper}>
      <div>
        <h1 className={styles.name}>{name}</h1>
        {/* <EditForm trigger={<Button fluid variant='ghost'>Edit</Button>} /> */}
      </div>
      {/* <MarketcapHistory /> */}
      <div className={styles.right}>
        <Share watchlist={watchlist} isAuthor={isAuthor} />
        <Actions isAuthor={isAuthor} name={name} id={id} />
        <Widgets {...props} />
      </div>
    </section>
  )
}

export default TopPanel
