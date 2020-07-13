import React from 'react'
import { connect } from 'react-redux'
import BaseActions from './BaseActions'
// import MarketcapHistory from './MarketcapHistory'
import Actions from './Actions'
import Widgets from './Widgets'
import { checkHasPremium } from '../../../../pages/UserSelectors'
import styles from './index.module.scss'

const TopPanel = ({ name, id, isLoggedIn, hasPremium, ...props }) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <BaseActions hasPremium={hasPremium} />
        <h1 className={styles.name}>{name}</h1>
      </div>
      {/* <MarketcapHistory /> */}
      <div>
        {isLoggedIn && (
          <Actions hasPremium={hasPremium} {...props} name={name} id={id} />
        )}
        <Widgets {...props} />
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  hasPremium: checkHasPremium(state)
})

export default connect(mapStateToProps)(TopPanel)
