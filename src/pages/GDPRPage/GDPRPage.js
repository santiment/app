import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Button from '@santiment-network/ui/Button'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Panel from '@santiment-network/ui/Panel'
import * as actions from './../../actions/types'
import styles from './GDPRPage.module.scss'

const GDPRPage = ({ togglePrivacyPolicy, privacyPolicyAccepted }) => {
  const [isGDPR, setGDPR] = useState(false)
  const toggleGDPR = () => setGDPR(!isGDPR)

  if (privacyPolicyAccepted) {
    return <Redirect to='/' />
  }

  return (
    <div className={cx('page', styles.wrapper)}>
      <Panel padding className={styles.container}>
        <h3 className={styles.title}>We value your privacy</h3>
        <p className={styles.description}>
          Please review and accept our Privacy Policy to continue using Sanbase
        </p>
        <div className={styles.check}>
          <Checkbox
            isActive={isGDPR}
            onClick={toggleGDPR}
            className={styles.checkbox}
          />
          <div className={styles.checkDescription}>
            <label className={styles.accept}>
              &nbsp;I have read and accept the &nbsp;
            </label>
            <Link to='/privacy-policy' className={styles.link}>
              Santiment Privacy Policy
            </Link>
          </div>
        </div>
        <Button
          className={styles.toggleBtn}
          disabled={!isGDPR}
          variant='fill'
          accent='positive'
          onClick={togglePrivacyPolicy}
        >
          Continue
        </Button>
      </Panel>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    privacyPolicyAccepted: state.user.data.privacyPolicyAccepted
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
