import React from 'react'
import BaseActions from './BaseActions'
import MarketcapHistory from './MarketcapHistory'
import Actions from './Actions'
import Widgets from './Widgets'
import styles from './index.module.scss'

const TopPanel = ({ name, id, isLoggedIn, ...props }) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <BaseActions />
        <h1 className={styles.name}>{name}</h1>
      </div>
      <MarketcapHistory />
      <div>
        {isLoggedIn && <Actions name={name} id={id} {...props} />}
        <Widgets />
      </div>
    </section>
  )
}

export default TopPanel
