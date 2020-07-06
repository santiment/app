import React from 'react'
import Actions from './Actions'
import BaseActions from './BaseActions'
import Widgets from './Widgets'
import styles from './index.module.scss'

const TopPanel = ({ name, id, isLoggedIn, ...props }) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <BaseActions />
        <h1 className={styles.name}>{name}</h1>
      </div>
      <div>
        <h2 className={styles.marketcap}>Total marketcap</h2>
      </div>
      <div>
        {isLoggedIn && <Actions name={name} id={id} {...props} />}
        <Widgets />
      </div>
    </section>
  )
}

export default TopPanel
