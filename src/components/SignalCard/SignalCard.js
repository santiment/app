import React from 'react'
import { Panel, Icon, Toggle } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import styles from './SignalCard.module.scss'

const SignalCard = ({
  title,
  description,
  author,
  subscriptionsNumber,
  isSubscribed
}) => {
  return (
    <Panel padding className={styles.wrapper}>
      <div className={styles.wrapper__left}>
        <div className={styles.icon}>
          <Icon type='wallet' />
        </div>
      </div>
      <div className={styles.wrapper__right}>
        <div className={styles.upper}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.description}>{description}</h3>
        </div>
        <div className={styles.bottom}>
          <h4 className={styles.author}>
            by{' '}
            <Link className={styles.author__link} to='/'>
              {author}
            </Link>
          </h4>
          <div className={styles.bottom__right}>
            <div className={styles.subscriptions}>
              <Icon type='profile' className={styles.subscriptions__icon} />
              {subscriptionsNumber}
            </div>
            <Toggle isActive={isSubscribed} />
          </div>
        </div>
      </div>
    </Panel>
  )
}

export default SignalCard
