import React, { Fragment } from 'react'
import { Panel, Icon, Toggle, Modal } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import MultilineText from '../../components/MultilineText/MultilineText'
import StatusLabel from './../../components/StatusLabel'
import SignalDetails from '../../pages/SonarFeed/SignalDetails'
import styles from './SignalCard.module.scss'

const SignalCard = ({
  id,
  title,
  description = '',
  className = '',
  author = 'Myself',
  gotoSignalByID,
  ...signalCardBottom
}) => {
  const isAwaiting = id === -1
  const SignalTopDetails = isAwaiting ? 'div' : SignalCardDetailsModal
  return (
    <Panel padding className={cx(styles.wrapper, className)}>
      <div
        className={cx(styles.wrapper__left, styles.wrapper__left_subscription)}
      >
        <div className={styles.icon}>
          <Icon type='wallet' />
        </div>
      </div>
      <div className={styles.wrapper__right}>
        <SignalTopDetails id={id}>
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
        </SignalTopDetails>
        {author && (
          <SignalCardBottom
            isAwaiting={isAwaiting}
            author={author}
            {...signalCardBottom}
          />
        )}
      </div>
    </Panel>
  )
}

const UnpublishedMsg = () => (
  <h4 className={styles.awaiting}>
    <Icon type='clock' className={styles.awaiting__icon} /> Awaiting posting
  </h4>
)

export const SignalCardWrapper = ({
  isLink = false,
  isAwaiting = false,
  id,
  description,
  title
}) => {
  const SignalTopDetails =
    isAwaiting && !isLink ? 'div' : SignalCardDetailsModal
  return (
    <div className={styles.wrapper__top}>
      <div
        className={cx(styles.wrapper__left, styles.wrapper__left_subscription)}
      >
        <div className={styles.icon}>
          <Icon type='wallet' />
        </div>
      </div>
      <div className={styles.wrapper__right}>
        <SignalTopDetails id={id}>
          <div className={styles.upper}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.description}>
              <MultilineText
                id='SignalCard__description'
                maxLines={2}
                text={description && description}
              />
            </h3>
          </div>
        </SignalTopDetails>
      </div>
    </div>
  )
}

const SignalCardBottom = ({
  author,
  username,
  isPublic,
  isPublished = true,
  isActive,
  isAwaiting = false,
  subscriptionsNumber,
  toggleSignal
}) => {
  const isUserTheAuthor = true

  return (
    <div className={styles.bottom}>
      {isPublished ? (
        <h4 className={styles.author}>
          {isAwaiting && 'Awaiting confirmation'}
          {isUserTheAuthor && !isAwaiting && (
            <StatusLabel isPublic={isPublic} />
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
        <Toggle onClick={toggleSignal} isActive={isActive} />
      </div>
    </div>
  )
}

const SignalCardDetailsModal = ({ children, id }) => (
  <Modal trigger={children} title='Signal details' showDefaultActions={false}>
    {({ closeModal }) => <SignalDetails id={id} closeModal={closeModal} />}
  </Modal>
)

export default SignalCard
