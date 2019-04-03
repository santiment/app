import React from 'react'
import * as qs from 'query-string'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Panel } from '@santiment-network/ui'
import Login from './Login'
import './Login.css'

export const LoginPage = ({
  user,
  isDesktop,
  location = {
    search: ''
  }
}) => {
  const qsData = qs.parse(location.search)
  if (qsData && qsData.redirect_to && user.token) {
    return <Redirect to={qsData.redirect_to} />
  }
  const consent = qsData && qsData.consent ? qsData.consent : ''
  if (user.data.hasOwnProperty('username') || user.token) {
    if (consent) {
      return <Redirect to={`/consent?consent=${consent}&token=${user.token}`} />
    }
    return <Redirect to='/' />
  }
  const WrapperEl = isDesktop ? Panel : 'div'
  return (
    <div className='page login wrapper'>
      <WrapperEl className='login-inner'>
        <Login isDesktop={isDesktop} consent={consent} />
      </WrapperEl>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LoginPage)
