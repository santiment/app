import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import Notification from '@santiment-network/ui/Notification'
import Trigger from './Trigger'
import EmailImage from './EmailImage'
import { useUpdateWatchlist } from '../../gql/list/mutations'
import EmailSetting from '../../../../pages/Account/EmailSetting'
import { useUserSettings } from '../../../../stores/user/settings'
import { notifyMonitoring } from '../../Widgets/TopPanel/notifications'
import styles from './index.module.scss'

const NOTIFICATION = {
  connected: {
    title: 'You have email address connected',
    description:
      'You’ll receive reports to the email address connected with your account',
    className: styles.notification,
    variant: 'info',
    classes: {
      title: styles.notificationTitle,
      conent: styles.notificationDescription
    }
  },
  notConnected: {
    title: 'Please connect your email address',
    description:
      'We’ve noticed that you’re logged in with Metamask, please enter an email address which will be connected to your account',
    className: cx(styles.notification, styles.notificationWarning),
    variant: 'warning',
    classes: {
      title: styles.notificationTitle,
      content: styles.notificationDescription
    }
  }
}

const STATUSES = {
  loading: 'Email is verifying',
  success: 'Email is correct',
  error: 'Error during typing email'
}

const WeeklyReport = ({ trigger, watchlist }) => {
  const { isMonitored: initialIsMonitored, name } = watchlist
  const {
    settings: { isEmailConnected }
  } = useUserSettings()
  const [isShown, setIsShown] = useState(false)
  const [isMonitored, toggleIsMonitored] = useState(initialIsMonitored)
  const [emailStatus, toggleEmailStatus] = useState()
  const [updateWatchlist] = useUpdateWatchlist()

  const close = () => {
    setIsShown(false)
    toggleEmailStatus(null)
  }

  const open = () => {
    setIsShown(true)
    toggleIsMonitored(initialIsMonitored)
  }

  const onSave = () => {
    if (isEmailConnected && initialIsMonitored !== isMonitored) {
      updateWatchlist(watchlist, { isMonitored }).then(state => {
        toggleIsMonitored(state.isMonitored)
      })
    }

    if (!isEmailConnected && emailStatus === STATUSES.success) {
      updateWatchlist(watchlist, { isMonitored }).then(state =>
        toggleIsMonitored(state.isMonitored)
      )
    }

    notifyMonitoring({ name, isMonitored, type: 'watchlist' })
    close()
  }

  return (
    <Dialog
      size='m'
      trigger={trigger || Trigger({ isMonitored })}
      onOpen={open}
      onClose={close}
      open={isShown}
      classes={{ title: styles.header, dialog: styles.dialog }}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <EmailImage className={styles.image} />
        <h4 className={styles.title}>Stay in touch with the latest events</h4>
        <p className={styles.description}>
          Every Sunday, you'll receive a report to your inbox with insights from
          the San family and people you follow, based on your monitored
          watchlists.
        </p>
        <Button
          variant='flat'
          onClick={() => toggleIsMonitored(!isMonitored)}
          className={cx(styles.toggleWrapper, isMonitored && styles.active)}
        >
          <Toggle isActive={isMonitored} className={styles.toggle} />
          Receive weekly report
        </Button>
        <div
          className={cx(
            styles.monitoredContent,
            !isEmailConnected && styles.monitoredContent__big,
            !isMonitored && styles.monitoredContent__hide
          )}
        >
          <Notification
            {...NOTIFICATION[isEmailConnected ? 'connected' : 'notConnected']}
            hasCloseBtn={false}
          />
          <EmailSetting
            withoutButtons={true}
            isEmailConnected={isEmailConnected}
            onChangeStatus={toggleEmailStatus}
            statuses={STATUSES}
          />
        </div>
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Button
          className={styles.approve}
          onClick={onSave}
          variant='fill'
          accent='positive'
          isLoading={!isEmailConnected && emailStatus === STATUSES.loading}
          disabled={
            isMonitored && !isEmailConnected && emailStatus === STATUSES.error
          }
        >
          Save preferences
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default WeeklyReport
