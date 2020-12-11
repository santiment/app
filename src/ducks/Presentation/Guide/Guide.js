import React from 'react'
import styles from './Guide.module.scss'
import { Lamp } from '../Cabinet/images'

const Guide = () => {
  return (
    <div>
      <div className={styles.header}>
        {Lamp}
        <div className={styles.header__content}>
          <div className={styles.header__content__title}>
            Get to know Sanbase
          </div>
          <div className={styles.header__description}>
            We’re here to help you get things rolling
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guide
