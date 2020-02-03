import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import StoriesList from '../../components/Stories/StoriesList'
import Studio from '../../ducks/Studio'
import { checkHasPremium, checkIsLoggedIn } from '../UserSelectors'
import { parseUrl } from '../../ducks/Studio/url'
import withBoundaries from './withBoundaries'
import styles from './index.module.scss'

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  hasPremium: checkHasPremium(state)
})

const enhance = compose(
  connect(mapStateToProps),
  withBoundaries
)

export default enhance(({ settings, options, metrics, events, ...props }) => {
  const sharedState = parseUrl()
  Object.assign(sharedState.settings, settings)
  Object.assign(sharedState.options, options)
  sharedState.metrics = sharedState.metrics || metrics
  sharedState.events = sharedState.events || events

  return <Studio {...props} {...sharedState} isWithPaywall={false} />
})
