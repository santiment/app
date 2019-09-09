import React from 'react'
import cx from 'classnames'
import TutorialCardImage from './TutorialCardImage'
import styles from './TutorialCard.module.scss'

const TutorialCard = ({
  onClick,
  className = '',
  title,
  duration,
  isViewed,
  type = 'video'
}) => {
  return (
    <div className={cx(styles.wrapper, className)} onClick={onClick}>
      <div className={styles.img}>
        <TutorialCardImage isViewed={isViewed} type={type} />
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.bottom}>
          <div className={cx(styles.icon, isViewed && styles.viewed)}>
            <svg
              width='5'
              height='6'
              viewBox='0 0 5 6'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.77412 2.57677L0.592929 0.135714C0.466487 0.0605154 0.315492 0.0677459 0.19396 0.154513C0.0724283 0.239835 0 0.393124 0 0.557982V5.44444C0 5.60785 0.0724283 5.76114 0.19396 5.84646C0.26025 5.89418 0.333906 5.91732 0.408789 5.91732C0.472624 5.91732 0.535232 5.89996 0.592929 5.8667L4.77535 3.42275C4.91284 3.34322 5 3.17981 5 3.00049C5 2.82117 4.91161 2.65775 4.77412 2.57677Z'
                fill='#7A859E'
              />
            </svg>
          </div>
          {duration}
        </div>
      </div>
    </div>
  )
}

export default TutorialCard
