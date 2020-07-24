import React from 'react'
import { connect } from 'react-redux'
// import BaseActions from './BaseActions'
// import MarketcapHistory from './MarketcapHistory'
import Actions from './Actions'
import Widgets from './Widgets'
import Share from '../../Actions/Share'
import { checkHasPremium } from '../../../../pages/UserSelectors'
import styles from './index.module.scss'

const TopPanel = ({
  name,
  id,
  isLoggedIn,
  shareLink,
  watchlist,
  hasPremium,
  isAuthor,
  ...props
}) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <h1 className={styles.name}>{name}</h1>
        {/* <BaseActions hasPremium={hasPremium} /> */}
      </div>
      {/* <MarketcapHistory /> */}
      <div className={styles.right}>
        {isAuthor && shareLink && (
          <Share shareLink={shareLink} watchlist={watchlist} />
        )}
        <Actions
          {...props}
          isLoggedIn={isLoggedIn}
          isAuthor={isAuthor}
          hasPremium={hasPremium}
          watchlist={watchlist}
          name={name}
          id={id}
        />
        <Widgets {...props} />
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  hasPremium: checkHasPremium(state)
})

export default connect(mapStateToProps)(TopPanel)
