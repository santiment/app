import React, { Fragment } from 'react'
import { Panel, Icon, Toggle } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import MultilineText from '../../components/MultilineText/MultilineText'
import styles from './SignalCard.module.scss'

const statusMap = [
  {
    icon: 'lock',
    label: 'Private'
  },
  { icon: 'public', label: 'Public' }
]

const UnpublishedMsg = () => (
  <h4 className={styles.awaiting}>
    <Icon type='clock' className={styles.awaiting__icon} /> Awaiting posting
  </h4>
)

const SignalCardBottom = ({
  author,
  username,
  isPublic,
  isPublished = true,
  isSubscribed = true,
  subscriptionsNumber
}) => {
  const Status = statusMap[Number(isPublic)] || statusMap[1]
  const isUserTheAuthor = true

  return (
    <div className={styles.bottom}>
      {isPublished ? (
        <h4 className={styles.author}>
          {isUserTheAuthor && (
            <Fragment>
              <Icon
                type={Status.icon}
                className={cx(styles.status, isPublic && styles.status_public)}
              />
              {Status.label}{' '}
            </Fragment>
          )}
          {!isUserTheAuthor && (
            <Fragment>
              by{' '}
              <Link className={styles.author__link} to='/'>
                {author}
              </Link>
            </Fragment>
          )}
        </h4>
      ) : (
        <UnpublishedMsg />
      )}
      <div className={styles.bottom__right}>
        {isPublic && (
          <div className={styles.subscriptions}>
            <Icon type='profile' className={styles.subscriptions__icon} />
            {subscriptionsNumber}
          </div>
        )}
        <Toggle disabled isActive={isSubscribed} />
      </div>
    </div>
  )
}

const SignalCard = ({
  title,
  description = '',
  className = '',
  author = 'Myself',
  ...signalCardBottom
}) => {
  return (
    <Panel padding className={cx(styles.wrapper, className)}>
      <div
        className={cx(
          styles.wrapper__left,
          author && styles.wrapper__left_subscription
        )}
      >
        <div className={styles.icon}>
          <Icon type='wallet' />
        </div>
      </div>
      <div className={styles.wrapper__right}>
        <div className={styles.upper}>
          <h2 className={styles.title}>{title}</h2>
          {description && (
            <h3 className={styles.description}>
              <MultilineText
                id='SignalCard__description'
                maxLines={2}
                text={description}
              />
            </h3>
          )}
        </div>
        {author && <SignalCardBottom author={author} {...signalCardBottom} />}
      </div>
    </Panel>
  )
}

export default SignalCard
