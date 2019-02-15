import React, { Fragment } from 'react'
import { Panel, Icon, Toggle } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import MultilineText from '../../components/MultilineText/MultilineText'
import styles from './SignalCard.module.scss'

const SignalCard = ({
  title,
  description,
  author,
  subscriptionsNumber,
  isSubscribed,
  isPublic,
  username,
  isPublished,
  className = ''
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
          <h3 className={styles.description}>
            <MultilineText
              id='SignalCard__description'
              maxLines={2}
              text={description}
            />
          </h3>
        </div>
        {author && (
          <div className={styles.bottom}>
            {isPublished ? (
              <h4 className={styles.author}>
                {author === username && (
                  <Fragment>
                    <Icon type={isPublic ? 'eye' : 'lock'} />{' '}
                    {isPublic ? 'Public' : 'Private'},{' '}
                  </Fragment>
                )}
                by{' '}
                <Link className={styles.author__link} to='/'>
                  {author === username ? 'Myself' : author}
                </Link>
              </h4>
            ) : (
              <h4 className={styles.awaiting}>
                <Icon type='profile-round' /> Awaiting posting
              </h4>
            )}
            <div className={styles.bottom__right}>
              {isPublic && isPublished && (
                <div className={styles.subscriptions}>
                  <Icon type='profile' className={styles.subscriptions__icon} />
                  {subscriptionsNumber}
                </div>
              )}
              <Toggle isActive={isSubscribed} />
            </div>
          </div>
        )}
      </div>
    </Panel>
  )
}

export default SignalCard
