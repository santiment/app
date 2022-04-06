import React from 'react'
import { GetStartedImg } from '../Cabinet/images'
import styles from './QuickStartTitle.module.scss'

const QuickStartTitle = ({ max, currentCount }) => {
  const percent = (100 * currentCount) / max

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {GetStartedImg}
        <div className={styles.info}>
          <div className={styles.title}>Get to know Sanbase</div>
          <div className={styles.description}>We’re here to help you get things rolling</div>
        </div>
      </div>

      <div className={styles.right}>
        <div>
          {currentCount}/{max} done <span className={styles.highline}>({percent}%)</span>
        </div>
        <div className={styles.line}>
          <div
            className={styles.filled}
            style={{
              transform: `translateX(-${100 - percent}%)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default QuickStartTitle
