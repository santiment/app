import React from 'react'
import cx from 'classnames'
import { SignalTypeIcon } from '../controls/SignalControls'
import { MobileOnly } from '../../Responsive'
import MoreSignalActions from '../controls/MoreSignalActions'
import styles from './SignalCard.module.scss'

const SignalCardHeader = ({
  deleteEnabled,
  isUserTheAuthor,
  isPublic,
  signal
}) => {
  const { id, title, settings: { type, metric } = {} } = signal

  return (
    <div
      className={cx(styles.wrapper__left, styles.wrapper__left_subscription)}
    >
      <SignalTypeIcon type={type} metric={metric} />

      <MobileOnly>
        <MoreSignalActions
          deleteEnabled={deleteEnabled}
          isUserTheAuthor={isUserTheAuthor}
          isPublic={isPublic}
          signalTitle={title}
          signalId={id}
        />
      </MobileOnly>
    </div>
  )
}

export default SignalCardHeader
