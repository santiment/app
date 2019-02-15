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
    <Panel>
      <div className={styles.icon}>
        <Icon type='wallet' />
      </div>
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
        <div className={styles.right}>
          <div className={styles.subscriptions}>
            <Icon type='profile' />
            {subscriptionsNumber}
          </div>
          <Toggle isActive={isSubscribed} />
        </div>
      </div>
    </Panel>
  )
}

export default SignalCard
