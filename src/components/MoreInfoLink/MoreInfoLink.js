import React from 'react'
import styles from './MoreInfoLink.module.scss'

const MoreInfoLink = ({ href }) => {
  return (
    <span className={styles.wrapper}>
      More info{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        className={styles.link}
      >
        here
      </a>
    </span>
  )
}

export default MoreInfoLink
