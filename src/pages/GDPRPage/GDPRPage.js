import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Panel, Checkbox, Button } from '@santiment-network/ui'
import styles from './GDPRPage.module.scss'
import * as actions from './../../actions/types'

const GDPRPage = ({
  toggleGDPRModal,
  togglePrivacyPolicy,
  privacyPolicyAccepted
}) => {
  const [isGDPR, setGDPR] = useState(false)
  const toggleGDPR = () => setGDPR(!isGDPR)

  if (privacyPolicyAccepted) {
    return <Redirect to='/' />
  }

  return (
    <Panel padding className={styles.wrapper}>
      <h2>Last step to get your Sanbase experience.</h2>
      <p>
        Please accept our updated Privacy Policy by May, 2018 to continue using
        Sanbase
      </p>
      <div>
        <Checkbox isActive={isGDPR} onClick={toggleGDPR} />
        <label>&nbsp;I have read and accept the &nbsp;</label>
        <Link onClick={toggleGDPRModal} to='/privacy-policy'>
          Santiment Privacy Policy
        </Link>
      </div>
      <div className={styles.toggleBtn}>
        <Button
          disabled={!isGDPR}
          variant='fill'
          accent='positive'
          onClick={togglePrivacyPolicy}
        >
          I Agree
        </Button>
      </div>
    </Panel>
  )
}

const mapStateToProps = state => {
  return {
    privacyPolicyAccepted: state.user.data.privacyPolicyAccepted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleGDPRModal: () => {
      dispatch({
        type: actions.APP_TOGGLE_GDPR_MODAL
      })
    },
    togglePrivacyPolicy: () => {
      dispatch({ type: actions.USER_TOGGLE_PRIVACY_POLICY })
    }
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(GDPRPage)
