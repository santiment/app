import React from 'react'
import styles from './MoreInfoLink.module.scss'

const MoreInfoLink = ({ href }) => {
  return (
    <div>
      More info{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        className={styles.link}
      >
        here
      </a>
    </div>
  )
}

export default MoreInfoLink
