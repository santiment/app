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
import styles from './AccountPage.module.scss'
import SettingsSonarWebPushNotifications from './SettingsSonarWebPushNotifications'

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
  digestType,
  changeDigestType,
  mutateDigestType
}) => {
  return (
    <Settings id='notifications' header='Notifications'>
      <Settings.Row>
        <SettingsEmailNotifications />
      </Settings.Row>

      <Settings.Row>
        <SettingsTelegramNotifications />
      </Settings.Row>

      <Settings.Row>
        <SettingsSonarWebPushNotifications />
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
            mutateDigestType({ variables: { subscription } })
              .then(() => {
                changeDigestType(subscription)
                onDigestChangeSuccess()
              })
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
