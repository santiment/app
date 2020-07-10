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
import GetSignals, {
  filterByChannels
} from '../../ducks/Signals/common/getSignals'
import { CHANNEL_TYPES } from '../../ducks/Signals/utils/constants'
import {
  useUserSettings,
  updateUserSettings
} from '../../contexts/user/settings'
import styles from './AccountPage.module.scss'
import Link from 'react-router-dom/Link'

export const NEWSLETTER_SUBSCRIPTION_MUTATION = gql`
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
  return filterByChannels(signals, type).length
}

const SignalsDescription = (mappedCount, allCount, channel) => {
  if (mappedCount === 0) {
    return null
  }

  return (
    <Link
      to={'/sonar/my-signals?channel=' + channel}
      className={styles.signalDescription}
    >{`Manage followed signals (${mappedCount}/${allCount})`}</Link>
  )
}

const SettingsNotifications = ({
  // digestType,
  changeDigestType,
  mutateDigestType
}) => {
  const { settings } = useUserSettings()
  const digestType = settings && settings.newsletterSubscription
  console.log(digestType)

  return (
    <GetSignals
      render={({ data: { signals = [] } = {}, isLoading }) => {
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
                description={SignalsDescription(
                  countWithEmail,
                  allCount,
                  CHANNEL_TYPES.Email
                )}
              />
            </Settings.Row>

            <Settings.Row>
              <SettingsTelegramNotifications
                description={SignalsDescription(
                  countWithTelegram,
                  allCount,
                  CHANNEL_TYPES.Telegram
                )}
              />
            </Settings.Row>

            <ShowIf beta>
              <Settings.Row>
                <SettingsSonarWebPushNotifications
                  description={SignalsDescription(
                    countWithBrowserPush,
                    allCount,
                    CHANNEL_TYPES.Browser
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
                    Receive the best insights and alerts on Sanbase
                    <br />
                    peersonalized based on your interests.
                  </Label>
                </div>
                <Selector
                  className={styles.digestSelector}
                  options={['WEEKLY', 'OFF']}
                  nameOptions={['Weekly', 'Off']}
                  onSelectOption={subscription =>
                    mutateDigestType({ variables: { subscription } })
                      .then(() => {
                        changeDigestType(subscription)
                        onDigestChangeSuccess()
                        updateUserSettings({
                          newsletterSubscription: subscription
                        })
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
    null,
    mapDispatchToProps
  ),
  graphql(NEWSLETTER_SUBSCRIPTION_MUTATION, { name: 'mutateDigestType' })
)

export default enhance(SettingsNotifications)
