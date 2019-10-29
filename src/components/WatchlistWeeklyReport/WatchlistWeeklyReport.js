import React, { useState } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import Notification from '@santiment-network/ui/Notification'
import { InputWithIcon } from '@santiment-network/ui/Input'
import EmailImage from './EmailImage'
import EmailSetting from '../../pages/Account/EmailSetting'
import { showNotification } from '../../actions/rootActions'
import { WATCHLIST_TOGGLE_MONITORING } from '../../actions/types'
import styles from './WatchlistWeeklyReport.module.scss'

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

const WatchlistWeeklyReport = ({
  trigger,
  isMonitored: initialIsMonitored,
  email,
  id,
  dispatchIsMonitored
}) => {
  const [isShown, setIsShown] = useState(false)
  const [isMonitored, toggleIsMonitored] = useState(initialIsMonitored)
  const isEmailConnected = !email

  const close = () => {
    setIsShown(false)
  }

  const open = () => {
    setIsShown(true)
  }

  const onSave = () => {
    if (isEmailConnected && initialIsMonitored !== isMonitored) {
      dispatchIsMonitored({ id, isMonitored })
    }

    close()
  }

  return (
    <Dialog
      trigger={trigger}
      onOpen={open}
      onClose={close}
      open={isShown}
      classes={{ title: styles.header }}
    >
      <Dialog.ScrollContent className={styles.wrapper}>
        <EmailImage className={styles.image} />
        <h4 className={styles.title}>Stay in touch with the latest events</h4>
        <p className={styles.description}>
          Every Sunday, you'll receive a report to your inbox with insights from
          the San family or other people you follow, based on your monitored
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
        {isMonitored && (
          <>
            <Notification
              {...NOTIFICATION[isEmailConnected ? 'connected' : 'notConnected']}
              hasCloseBtn={false}
            />
            {isEmailConnected && (
              <EmailSetting>
                <InputWithIcon
                  icon='mail'
                  iconPosition='left'
                  className={styles.inputWrapper}
                  inputClassName={cx(
                    styles.input,
                    isEmailConnected && styles.inputDisabled
                  )}
                  iconClassName={styles.inputIcon}
                  disabled={isEmailConnected}
                  defaultValue={email}
                />
              </EmailSetting>
            )}
          </>
        )}
      </Dialog.ScrollContent>
      <Dialog.Actions className={styles.actions}>
        <Dialog.Approve
          className={styles.approve}
          onClick={onSave}
          disabled={initialIsMonitored === isMonitored}
        >
          Save preferences
        </Dialog.Approve>
      </Dialog.Actions>
    </Dialog>
  )
}

const mapStateToProps = ({ user: { data: { email } = {} } }) => ({
  email
})

const mapDispatchToProps = dispatch => ({
  dispatchIsMonitored: payload => {
    dispatch({ type: WATCHLIST_TOGGLE_MONITORING, payload })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistWeeklyReport)
