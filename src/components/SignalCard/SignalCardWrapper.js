import React from 'react'
import cx from 'classnames'
import MultilineText from '../MultilineText/MultilineText'
import { SignalCardDetailsModal } from './SignalCardDetailsModal'
import { SignalTypeIcon } from './controls/SignalControls'
import styles from './SignalCard.module.scss'

export const SignalCardWrapper = ({
  isModal = true,
  id,
  description,
  type,
  title,
  children
}) => {
  const SignalTopDetails = !isModal ? 'div' : SignalCardDetailsModal

  return (
    <div className={styles.wrapper__top}>
      <div
        className={cx(styles.wrapper__left, styles.wrapper__left_subscription)}
      >
        <SignalTypeIcon type={type} />
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
