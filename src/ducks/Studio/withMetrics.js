import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getCategoryGraph } from './Sidebar/utils'
import { getMarketSegment } from './timeseries/marketSegments'

const PROJECT_METRICS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
      availableQueries
      marketSegments
    }
  }
`

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  props: ({
    data: {
      loading,
      project: {
        availableMetrics = [],
        availableQueries = [],
        marketSegments = []
      } = {}
    },
    ownProps: { hiddenMetrics = [] }
  }) => {
    console.log({
      availableMetrics,
      availableQueries,
      marketSegments
    })
    const categories = getCategoryGraph(
      availableQueries
        .concat(availableMetrics)
        .concat(marketSegments.map(getMarketSegment)),
      hiddenMetrics
    )

    return {
      loading,
      categories
    }
  },
  skip: ({ slug }) => !slug,
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})
