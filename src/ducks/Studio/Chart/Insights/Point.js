import React from 'react'
import styles from './Point.module.scss'

const Point = ({ left, top, user, ...insight }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        left,
        top,
        '--author': `url("${user.avatarUrl}")`
      }}
    />
  )
}

export default Point
