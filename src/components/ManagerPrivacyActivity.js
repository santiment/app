import React from 'react'
import { connect } from 'react-redux'
import { Panel, Toggle, Message } from '@santiment-network/ui'
import * as actions from './../actions/types'
import './ManagerPrivacyActivity.css'

const ManagerPrivacyActivity = ({
  privacyPolicyAccepted,
  marketingAccepted,
  togglePrivacyPolicy,
  toggleMarketing,
}) => {
  return (
    <Panel padding>
      <h2>Data & Privacy</h2>
      <Message>Manage your activity</Message>
      <div className='gdpr-settings-privacy'>
        <div className='gdpr-settings-privacy__card'>
          <div className='gdpr-settings-privacy__card-header'>Your Sanbase experience</div>
          <div className='gdpr-settings-privacy__card-content'>
            <p>
              Process the personal data provided by me for the registration on this website to
              support and administer my user account.
            </p>
            <Toggle onClick={togglePrivacyPolicy} isActive={privacyPolicyAccepted} />
          </div>
        </div>
        <div className='gdpr-settings-privacy__card'>
          <div className='gdpr-settings-privacy__card-header'>Marketing materials</div>
          <div className='gdpr-settings-privacy__card-content'>
            <p>
              Contact me to send me marketing materials related to the Company’s services and
              operations.
            </p>
            <Toggle onClick={toggleMarketing} isActive={marketingAccepted} />
          </div>
        </div>
      </div>
    </Panel>
  )
}

const mapStateToProps = (state) => {
  return {
    privacyPolicyAccepted: state.user.data.privacyPolicyAccepted,
    marketingAccepted: state.user.data.marketingAccepted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePrivacyPolicy: () => {
      dispatch({ type: actions.USER_TOGGLE_PRIVACY_POLICY })
    },
    toggleMarketing: () => {
      dispatch({ type: actions.USER_TOGGLE_MARKETING })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPrivacyActivity)
