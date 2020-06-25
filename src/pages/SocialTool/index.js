import React from 'react'
import SocialTool from '../../ducks/SocialTool'
import withBoundaries from '../Studio/withBoundaries'
import { parseUrl } from '../../ducks/Studio/url/parse'
import {
  DEFAULT_SETTINGS,
  DEFAULT_OPTIONS
} from '../../ducks/SocialTool/defaults'

export default withBoundaries(({ settings, options, ...props }) => {
  const sharedState = parseUrl(DEFAULT_SETTINGS, DEFAULT_OPTIONS)
  Object.assign(sharedState.settings, settings)
  Object.assign(sharedState.options, options)

  return <SocialTool {...props} {...sharedState} />
})
