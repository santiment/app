import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import * as qs from 'query-string'
import { TRIGGER_BY_ID_QUERY } from './queries'
import { mapGQLTriggerToProps } from '../utils/utils'

const getInfoFromQuery = (listname = '') => {
  const [title, id] = listname.split('@')
  return { title, id }
}

export const getShareSignalParams = () => {
  const { search, hash } = window.location || {}
  const oldParsed = compose(
    getInfoFromQuery,
    parsed => parsed.name,
    qs.parse
  )(search)

  // GarageInc: code above is for support old sharing of signals, remove in future(September/October)
  const parsedSignalParams = qs.parse(window.location.search, {
    arrayFormat: 'comma'
  })

  const isShared =
    hash === '#shared' || Object.keys(parsedSignalParams).length > 0

  const triggerParams = { isShared, ...oldParsed, ...parsedSignalParams }
  Object.keys(triggerParams).forEach(key =>
    triggerParams[key] === undefined || triggerParams[key] === ''
      ? delete triggerParams[key]
      : ''
  )

  return triggerParams
}

const GetSignal = ({ render, ...props }) => render(props)

GetSignal.defaultProps = {
  isLoading: false
}

export default graphql(TRIGGER_BY_ID_QUERY, {
  skip: ({ triggerId, skip }) => skip || !triggerId,
  options: ({ triggerId: id }) => {
    return {
      fetchPolicy: 'network-only',
      variables: { id: +id }
    }
  },
  props: mapGQLTriggerToProps
})(GetSignal)
