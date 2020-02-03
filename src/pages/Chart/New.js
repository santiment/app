import React from 'react'
import cx from 'classnames'
import StoriesList from '../../components/Stories/StoriesList'

import withBoundaries from './withBoundaries'
import styles from './index.module.scss'

import Studio from '../../ducks/Studio'
import { parseUrl } from '../../ducks/Studio/url'

const hasPremium = false

export default withBoundaries(({ settings, ...props }) => {
  /* const onChangeSlug = ({ slug: newSlug } = {}) => {
   *   slug && slug !== newSlug && history.replace(`/projects/${newSlug}`)
   * }
   */
  const sharedState = parseUrl()
  Object.assign(sharedState.settings, settings)

  return <Studio {...props} {...sharedState} isWithPaywall={false} />
})
