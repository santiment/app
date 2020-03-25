import { stringify, parse } from 'query-string'
import { reduceStateKeys } from '../Studio/url'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from './defaults'

export function generateShareLink (settings, options) {
  const { isShowSocialDominance } = options
  const { timeRange } = settings
  const Shareable = { timeRange, isShowSocialDominance }

  return stringify(Shareable, { arrayFormat: 'comma' })
}

export function parseUrl () {
  const data = parse(window.location.search, { arrayFormat: 'comma' })

  return {
    settings: reduceStateKeys(DEFAULT_SETTINGS, data),
    options: reduceStateKeys(DEFAULT_OPTIONS, data)
  }
}
