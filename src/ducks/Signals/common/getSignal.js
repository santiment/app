import * as qs from 'query-string'
import { TRIGGER_BY_ID_QUERY } from './queries'
import { useQuery } from '@apollo/react-hooks'

export const getShareSignalParams = (params = {}) => {
  const { search, hash } = window.location || {}

  const parsedSignalParams = qs.parse(search, {
    arrayFormat: 'comma'
  })

  const isShared =
    hash === '#shared' ||
    (params.id && Object.keys(parsedSignalParams).length > 0)

  const triggerParams = { isShared, ...parsedSignalParams }
  Object.keys(triggerParams).forEach(key =>
    triggerParams[key] === undefined || triggerParams[key] === ''
      ? delete triggerParams[key]
      : ''
  )

  return triggerParams
}

export const useSignal = ({ triggerId, skip }) => {
  const { data, loading, error } = useQuery(TRIGGER_BY_ID_QUERY, {
    skip: skip || !triggerId,
    variables: { id: +triggerId }
  })

  return { data, loading, error }
}
