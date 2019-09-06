import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Label from '@santiment-network/ui/Label'
import Selector from '@santiment-network/ui/Selector/Selector'
import Settings from './Settings'
import * as actions from '../../actions/types'
import { store } from '../../index'
import { showNotification } from '../../actions/rootActions'
import SettingsTelegramNotifications from './SettingsTelegramNotifications'
import SettingsEmailNotifications from './SettingsEmailNotifications'
import SettingsSonarWebPushNotifications from './SettingsSonarWebPushNotifications'
import ShowIf from '../../components/ShowIf/ShowIf'
import GetSignals from '../../ducks/Signals/common/getSignals'
import { CHANNEL_TYPES } from '../../ducks/Signals/utils/constants'
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

const channelByTypeLength = (signals, type) => {
  return signals.filter(({ settings: { channel } }) =>
    Array.isArray(channel) ? channel.indexOf(type) !== -1 : channel === type
  ).length
}

const SignalsDescription = (mappedCount, allCount) => {
  return (
    <div
      className={styles.signalDescription}
    >{`Manage followed signals (${mappedCount}/${allCount})`}</div>
  )
}

const SettingsNotifications = ({
  digestType,
  changeDigestType,
  mutateDigestType
}) => {
  return (
    <GetSignals
      render={({ signals, isLoading }) => {
        const allCount = signals.length
        const countWithEmail = channelByTypeLength(signals, CHANNEL_TYPES.Email)
        const countWithTelegram = channelByTypeLength(
          signals,
          CHANNEL_TYPES.Telegram
        )
        const countWithBrowserPush = channelByTypeLength(
          signals,
          CHANNEL_TYPES.Browser
        )

        return (
          <Settings id='notifications' header='Notifications'>
            <Settings.Row>
              <SettingsEmailNotifications
                description={SignalsDescription(countWithEmail, allCount)}
              />
            </Settings.Row>

            <Settings.Row>
              <SettingsTelegramNotifications
                description={SignalsDescription(countWithTelegram, allCount)}
              />
            </Settings.Row>

            <ShowIf beta>
              <Settings.Row>
                <SettingsSonarWebPushNotifications
                  description={SignalsDescription(
                    countWithBrowserPush,
                    allCount
                  )}
                />
              </Settings.Row>
            </ShowIf>

            <Settings.Row>
              <div className={styles.digest}>
                <div className={styles.setting__left}>
                  <Label>Digest</Label>
                  <Label
                    className={styles.setting__description}
                    accent='waterloo'
                  >
                    Receive the best insights and signals on Sanbase
                    <br />
                    peersonalized based on your interests.
                  </Label>
                </div>
                <Selector
                  className={styles.digestSelector}
                  options={['DAILY', 'WEEKLY', 'OFF']}
                  nameOptions={['Daily', 'Weekly', 'Off']}
                  onSelectOption={subscription =>
                    mutateDigestType({ variables: { subscription } })
                      .then(() => {
                        changeDigestType(subscription)
                        onDigestChangeSuccess()
                      })
                      .catch(onDigestChangeError)
                  }
                  defaultSelected={digestType}
                />
              </div>
            </Settings.Row>
          </Settings>
        )
      }}
    />
  )
}

const mapStateToProps = ({
  user: {
    data: { settings: { newsletterSubscription } = {} }
  }
}) => ({
  digestType: newsletterSubscription
})

const mapDispatchToProps = dispatch => ({
  changeDigestType: type =>
    dispatch({
      type: actions.USER_DIGEST_CHANGE,
      payload: type
    })
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(NEWSLETTER_SUBSCRIPTION_MUTATION, { name: 'mutateDigestType' })
)

export default enhance(SettingsNotifications)
