import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import * as qs from 'query-string'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import * as actions from './../../actions/types'
import PageLoader from '../../components/Loader/PageLoader'
import MobileWrapper from '../Login/Mobile/MobileWrapper'
import styles from './Verification.module.scss'

export const EmailLoginVerification = ({ isSuccess, isError, isDesktop }) => {
  if (isSuccess) {
    return <Redirect to='/' />
  }

  let child
  const className = cx(styles.wrapper, !isDesktop && styles.mobile)

  if (isError) {
    child = (
      <div className={className}>
        <h2>Login failed</h2>
        <p>
          Maybe you are trying to log in with an old email link. Please, make sure, that you are
          using the latest link
        </p>
        <div>
          Back to{' '}
          <Link to='/login' className={styles.link}>
            log in options
          </Link>
        </div>
      </div>
    )
  } else {
    child = (
      <div className={className}>
        <PageLoader text='Verification' className={styles.loader} />
      </div>
    )
  }

  return isDesktop ? child : <MobileWrapper withHeader>{child}</MobileWrapper>
}

const mapStateToProps = ({ rootUi }) => {
  return {
    isError: rootUi.loginError,
    isSuccess: rootUi.loginSuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    emailLogin: (payload) => {
      dispatch({
        type: actions.USER_EMAIL_LOGIN,
        payload,
      })
    },
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const payload = qs.parse(this.props.location.search)
      this.props.emailLogin(payload)
    },
  }),
)

export default enhance(EmailLoginVerification)
