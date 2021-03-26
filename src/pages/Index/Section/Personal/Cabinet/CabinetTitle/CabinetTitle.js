import React from 'react'
import styles from './CabinetTitle.module.scss'

const CabinetTitle = ({ img, title, description, as: El = 'div', ...rest }) => (
  <div className={styles.headerContainer}>
    <div className={styles.header}>
      {img}

      <div className={styles.header__content}>
        <El className={styles.header__content__title} {...rest}>
          {title}
        </El>
        <div className={styles.header__content__description}>{description}</div>
      </div>
    </div>
  </div>
)

export default CabinetTitle
