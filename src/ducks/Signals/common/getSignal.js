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
  const { title, id } = compose(
    getInfoFromQuery,
    parsed => parsed.name,
    qs.parse
  )(search)

  const isShared = hash === '#shared'

  // GarageInc: code above is for support old sharing of signals, remove in future(September/October)
  const parsedSignalParams = qs.parse(window.location.search, {
    arrayFormat: 'comma'
  })

  return { isShared, title, id, ...parsedSignalParams }
}

const GetSignal = ({ render, ...props }) => render(props)

GetSignal.defaultProps = {
  isLoading: false
}

export default graphql(TRIGGER_BY_ID_QUERY, {
  skip: data => {
    const { triggerId } = data
    return !triggerId
  },
  options: ({ triggerId: id }) => {
    return {
      fetchPolicy: 'network-only',
      variables: { id: +id }
    }
  },
  props: mapGQLTriggerToProps
})(GetSignal)
