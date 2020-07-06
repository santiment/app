import React from 'react'
import Actions from './Actions'
import styles from './index.module.scss'

const TopPanel = ({ name, id, isAuthor, isLoggedIn }) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <h1 className={styles.name}>{name}</h1>
      </div>
      <div>
        <h2 className={styles.marketcap}>Total marketcap</h2>
      </div>
      {isLoggedIn && <Actions name={name} id={id} isAuthor={isAuthor} />}
    </section>
  )
}

export default TopPanel
