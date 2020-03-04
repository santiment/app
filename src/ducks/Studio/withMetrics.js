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

function array_move (arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr // for testing
}

const moveDaaAbove = categories => {
  if (categories['On-chain']) {
    const groups = categories['On-chain']

    if (groups) {
      let keys = Object.keys(groups)

      const indexNetworkActivity = keys.indexOf('Network Activity')
      if (keys.length > 1 && indexNetworkActivity !== 1) {
        keys = array_move(keys, indexNetworkActivity, 1)

        const newGroups = {}
        keys.forEach(key => {
          newGroups[key] = groups[key]
        })

        categories['On-chain'] = newGroups
      }
    }
  }

  return categories
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

    categories = moveDaaAbove(categories)

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
