import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

export default ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.header}>
        Create signal if:
        <span className={styles.manual}>Create signal manually</span>
      </div>
      <div className={styles.suggestions}>
        <div className={styles.suggestion}>
          <div className={styles.title}>Blockchain</div>
          <div className={styles.signal}>
            Word mentions more than <span className={styles.value}>567</span>
          </div>
          <div className={styles.signal}>
            Word mentions more than <span className={styles.value}>567</span>
          </div>
          <div className={styles.signal}>
            Word mentions more than <span className={styles.value}>567</span>
          </div>
        </div>
        <div className={styles.suggestion}>
          <div className={styles.title}>Blockchain</div>
          <div className={styles.signal}>
            Word mentions more than <span className={styles.value}>567</span>
          </div>
          <div className={styles.signal}>
            Word mentions more than <span className={styles.value}>567</span>
          </div>
          <div className={styles.signal}>
            Word mentions more than <span className={styles.value}>567</span>
          </div>
        </div>
      </div>
    </div>
  )
}
