import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import * as qs from 'query-string'
import { Link } from 'react-router-dom'
import * as actions from './../../actions/types'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './Verification.module.scss'

export const EmailLoginVerification = ({ isSuccess, isError }) => {
  if (isError) {
    return (
      <div className={styles.wrapper}>
        <h2>Login failed</h2>
        <p>
          Maybe you are trying to login with an old email link. Please, make
          sure, that you are using the latest link
        </p>
        <Link to='/login' className={styles.link}>
          Login
        </Link>
      </div>
    )
  }
  if (isSuccess) {
    return <Redirect to='/' />
  }
  return (
    <div className={styles.wrapper}>
      <PageLoader text='Verification' loaderClassName={styles.loader} />
    </div>
  )
}

const mapStateToProps = ({ rootUi }) => {
  return {
    isError: rootUi.loginError,
    isSuccess: rootUi.loginSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    emailLogin: payload => {
      dispatch({
        type: actions.USER_EMAIL_LOGIN,
        payload
      })
    }
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount () {
      const payload = qs.parse(this.props.location.search)
      this.props.emailLogin(payload)
    }
  })
)

export default enhance(EmailLoginVerification)
