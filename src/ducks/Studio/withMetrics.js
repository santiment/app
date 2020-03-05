import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getCategoryGraph, getTimeboundMetrics } from './Sidebar/utils'
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

function sortCategoryGroups (category) {
  const sortedCategory = {}
  const groups = Object.keys(category).sort(
    (leftGroup, rightGroup) =>
      category[leftGroup].length - category[rightGroup].length
  )

  groups.forEach(group => (sortedCategory[group] = category[group]))
  return sortedCategory
}

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
    ownProps: { noMarketSegments, hiddenMetrics = [] }
  }) => {
    let categories = getCategoryGraph(
      availableQueries
        .concat(availableMetrics)
        .concat(noMarketSegments ? [] : marketSegments.map(getMarketSegment)),
      hiddenMetrics
    )

    for (const item in categories) {
      categories[item] = sortCategoryGroups(categories[item])
    }

    return {
      loading,
      categories,
      Timebound: getTimeboundMetrics(availableMetrics)
    }
  },
  skip: ({ slug }) => !slug,
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})
