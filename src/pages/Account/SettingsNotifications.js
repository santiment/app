import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import * as actions from '../../actions/types'
import { store } from '../../index'
import { showNotification } from '../../actions/rootActions'
import styles from './AccountPage.module.scss'

const NEWSLETTER_SUBSCRIPTION_MUTATION = gql`
  mutation changeNewsletterSubscription(
    $subscription: NewsletterSubscriptionType
  ) {
    changeNewsletterSubscription(newsletterSubscription: $subscription) {
      newsletterSubscription
    }
  }
`
const onDigestChangeSuccess = () =>
  store.dispatch(showNotification('Digest type has been successfully changed'))

const onDigestChangeError = () =>
  store.dispatch(
    showNotification({ title: 'Failed to change digest type', type: 'error' })
  )

const SettingsNotifications = ({
  isEmailNotificationEnabled,
  isTelegramNotificationEnabled,
  toggleEmailNotification,
  toggleTelegramNotification,
  digestType,
  changeDigestType
}) => {
  return (
    <Settings id='notifications' header='Notifications'>
      <Settings.Row>
        <Label>Email notifications</Label>
        <div className={styles.setting__right_notifications}>
          <Label className={styles.signalInfo} accent='jungle-green'>
            Manage followed signals (15/25)
          </Label>
          <Toggle
            isActive={isEmailNotificationEnabled}
            onClick={() => toggleEmailNotification(!isEmailNotificationEnabled)}
          />
        </div>
      </Settings.Row>

      <Settings.Row>
        <Label>Telegram notifications</Label>

        <div className={styles.setting__right_notifications}>
          <Label className={styles.signalInfo} accent='jungle-green'>
            Manage followed signals (25/25)
          </Label>
          <Toggle
            isActive={isTelegramNotificationEnabled}
            onClick={() =>
              toggleTelegramNotification(!isTelegramNotificationEnabled)
            }
          />
        </div>
      </Settings.Row>

      <Settings.Row>
        <div className={styles.setting__left}>
          <Label>Digest</Label>
          <Label className={styles.setting__description} accent='waterloo'>
            Receive the best insights and signals on Sanbase
            <br />
            peersonalized based on your interests.
          </Label>
        </div>
        <Selector
          options={['DAILY', 'WEEKLY', 'OFF']}
          nameOptions={['Daily', 'Weekly', 'Off']}
          onSelectOption={subscription =>
            changeDigestType({ variables: { subscription } })
              .then(onDigestChangeSuccess)
              .catch(onDigestChangeError)
          }
          defaultSelected={digestType}
        />
      </Settings.Row>
    </Settings>
  )
}

const mapStateToProps = ({
  user: {
    data: {
      email,
      settings: {
        signalNotifyEmail,
        signalNotifyTelegram,
        newsletterSubscription
      }
    }
  }
}) => ({
  hasEmail: !!email,
  isEmailNotificationEnabled: signalNotifyEmail,
  isTelegramNotificationEnabled: signalNotifyTelegram,
  digestType: newsletterSubscription
})

const mapDispatchToProps = dispatch => ({
  toggleEmailNotification: signalNotifyEmail =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyEmail }
    }),
  toggleTelegramNotification: signalNotifyTelegram =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyTelegram }
    })
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(NEWSLETTER_SUBSCRIPTION_MUTATION, { name: 'changeDigestType' })
)

export default enhance(SettingsNotifications)
