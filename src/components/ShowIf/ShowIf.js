import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { checkHasPremium, checkIsLoggedIn } from './../../pages/UserSelectors'

const ShowIf = ({
  beta,
  loggedIn,
  premium,
  news,
  isBeta,
  isLoggedIn,
  isPremium,
  isShowNews,
  children,
  condition
}) => {
  if (beta && isBeta) {
    return <Fragment>{children}</Fragment>
  }
  if (premium && isPremium) {
    return <Fragment>{children}</Fragment>
  }
  if (loggedIn && isLoggedIn) {
    return <Fragment>{children}</Fragment>
  }
  if (news && isShowNews) {
    return <Fragment>{children}</Fragment>
  }
  if (condition) {
    return <Fragment>{children}</Fragment>
  }
  return ''
}

const mapStateToProps = (state, props) => {
  return {
    isBeta: props.beta !== void 0 ? state.rootUi.isBetaModeEnabled : undefined,
    isShowNews: props.news !== void 0 ? state.rootUi.isNewsEnabled : undefined,
    isPremium: props.premium !== void 0 ? checkHasPremium(state) : undefined,
    isLoggedIn: props.loggedIn !== void 0 ? checkIsLoggedIn(state) : undefined
  }
}

export default connect(mapStateToProps)(ShowIf)
