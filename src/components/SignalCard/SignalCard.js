import React, { Fragment, useState } from 'react'
import { Panel, Icon, Toggle } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import MultilineText from '../../components/MultilineText/MultilineText'
import StatusLabel from './../../components/StatusLabel'
import SignalDetails from '../../pages/SonarFeed/SignalDetails'
import styles from './SignalCard.module.scss'
import Dialog from '@santiment-network/ui/Dialog'

const SignalCard = ({
  id,
  title,
  description = '',
  className = '',
  author = 'Myself',
  gotoSignalByID,
  ...signalCardBottom
}) => {
  const isAwaiting = +id <= 0

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
  isModal = true,
  id,
  description,
  title,
  children
}) => {
  const SignalTopDetails = !isModal ? 'div' : SignalCardDetailsModal

  return (
    <div className={styles.wrapper__top}>
      <div
        className={cx(styles.wrapper__left, styles.wrapper__left_subscription)}
      >
        <div className={styles.icon}>
          <Icon type='connection' />
        </div>
      </div>
      <div className={styles.wrapper__right}>
        <SignalTopDetails id={id}>
          <div className={isModal ? styles.upper : ''}>
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

        {children}
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
          {isAwaiting && (
            <div className={styles.awaitingBlock}>
              <Icon type='awaiting' />
              <span>&nbsp;&nbsp;Awaiting confirmation</span>
            </div>
          )}
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
        <Toggle onClick={toggleSignal} isActive={isActive} />
      </div>
    </div>
  )
}

const SignalCardDetailsModal = ({ children, id }) => {
  const [dialogOpenState, setDialogOpenState] = useState(false)

  return (
    <Dialog trigger={children} title='Signal details'>
      <Dialog.ScrollContent>
        <SignalDetails id={id} closeModal={() => setDialogOpenState(false)} />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default SignalCard
