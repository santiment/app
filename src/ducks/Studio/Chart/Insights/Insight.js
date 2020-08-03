import React from 'react'
import Avatar from './Avatar'
import styles from './Insight.module.scss'

const Insight = ({ title, user }) => {
  const { username, avatarUrl } = user
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <a className={styles.title} href='/'>
          {title}
        </a>
      </div>
      <a className={styles.user} href='/'>
        <Avatar className={styles.user__avatar} src={avatarUrl} />
        {username}
      </a>
    </div>
  )
}

export default Insight
