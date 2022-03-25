import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { NEWSLETTER_SUBSCRIPTION_MUTATION } from './gql'
import Settings from './Settings'
import * as actions from '../../actions/types'
import SettingsTelegramNotifications from './SettingsTelegramNotifications'
import SettingsEmailNotifications from './SettingsEmailNotifications'
import SettingsSonarWebPushNotifications from './SettingsSonarWebPushNotifications'
import ShowIf from '../../components/ShowIf/ShowIf'
import {
  filterByChannels,
  useSignals
} from '../../ducks/Signals/common/getSignals'
import { CHANNEL_TYPES } from '../../ducks/Signals/utils/constants'
import { useUserSettings } from '../../stores/user/settings'
import SignalLimits from './limits/SignalLimits'
import styles from './AccountPage.module.scss'

const channelByTypeLength = (signals, type) => {
  return filterByChannels(signals, type).length
}

const SignalsDescription = (
  mappedCount,
  allCount,
  channel,
  channelName = channel
) => {
  if (mappedCount === 0) {
    return null
  }

  return (
    <Link
      to={'/alerts?channel=' + channel}
      className={styles.signalDescription}
    >{`Manage ${channelName} alerts (${mappedCount}/${allCount})`}</Link>
  )
}

const SettingsNotifications = () => {
  const { settings } = useUserSettings()

  const { alertsPerDayLimit } = settings

  const { data: signals } = useSignals()

  const allCount = signals.length
  const countWithEmail = channelByTypeLength(signals, CHANNEL_TYPES.Email)
  const countWithTelegram = channelByTypeLength(signals, CHANNEL_TYPES.Telegram)
  const countWithBrowserPush = channelByTypeLength(
    signals,
    CHANNEL_TYPES.Browser
  )

  return (
    <Settings id='notifications' header='Alert notifications'>
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
              CHANNEL_TYPES.Browser,
              'web push'
            )}
          />
        </Settings.Row>
      </ShowIf>

      <Settings.Row>
        <SignalLimits alertsPerDayLimit={alertsPerDayLimit} classes={styles} />
      </Settings.Row>
    </Settings>
  )
}

const mapDispatchToProps = dispatch => ({
  changeDigestType: type =>
    dispatch({
      type: actions.USER_DIGEST_CHANGE,
      payload: type
    })
})

const enhance = compose(
  connect(null, mapDispatchToProps),
  graphql(NEWSLETTER_SUBSCRIPTION_MUTATION, { name: 'mutateDigestType' })
)

export default enhance(SettingsNotifications)
