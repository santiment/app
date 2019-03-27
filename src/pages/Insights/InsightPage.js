import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import PageLoader from '../../components/PageLoader'
import { INSIGHT_BY_ID_QUERY } from './InsightsGQL'
import { getInsightIdFromSEOLink } from './utils'

const LoadableInsightCreationPage = Loadable({
  loader: () => import('./InsightCreationPage'),
  loading: () => <PageLoader />
})

const LoadableInsightViewPage = Loadable({
  loader: () => import('./InsightViewPage'),
  loading: () => <PageLoader />
})

const isInsightADraftByDifferentUser = ({ readyState, user: { id } }, userId) =>
  readyState === 'draft' && id !== userId

const InsightPage = ({
  data,
  userId,
  match: {
    path,
    params: { id }
  },
  ...rest
}) => {
  if (!data || data.loading || !data.insight) return null

  if (isInsightADraftByDifferentUser(data.insight, userId)) {
    return <Redirect to='/insights' />
  }

  const isEditLocation = path.includes('/edit/')
  if (isEditLocation && data.insight.readyState !== 'draft') {
    return <Redirect to={`/insights/${id}`} />
  }

  const View = isEditLocation
    ? LoadableInsightCreationPage
    : LoadableInsightViewPage

  return <View {...rest} {...data.insight} />
}

const mapStateToProps = ({ user: { data } }) => ({
  userId: data.id
})

const enhance = compose(
  connect(mapStateToProps),
  graphql(INSIGHT_BY_ID_QUERY, {
    skip: ({
      match: {
        params: { id }
      }
    }) => {
      return !Number.isInteger(getInsightIdFromSEOLink(id))
    },
    options: ({
      match: {
        params: { id }
      }
    }) => ({
      fetchPolicy: 'network-only',
      variables: {
        id: getInsightIdFromSEOLink(id)
      }
    })
  })
)

export default enhance(InsightPage)
