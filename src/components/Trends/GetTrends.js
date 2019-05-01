import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { trendsExploreGQL } from '../../components/Trends/trendsExploreGQL'
import { getIntervalByTimeRange } from './../../utils/dates.js'

const GetTrends = ({ render, sources = {}, ...props }) =>
  render({ sources, ...props })

const emptyChartData = []

export const normalizeTopic = topic => {
  const pattern = /AND|OR/
  if (topic.split(' ').length > 1 && !pattern.test(topic)) {
    return `"${topic}"`
  }
  return topic
}

const parseTrendsGQLProps = sourceType => ({
  data: { loading, error, topicSearch = {} },
  ownProps: { sources = {} }
}) => {
  const { chartData = emptyChartData } = topicSearch
  return {
    sources: {
      ...sources,
      [`${sourceType.toLowerCase()}`]: chartData
    },
    isLoading: loading,
    isError: error
  }
}

const makeAllQueries = () =>
  ['TELEGRAM', 'PROFESSIONAL_TRADERS_CHAT', 'REDDIT', 'DISCORD'].map(source =>
    graphql(trendsExploreGQL, {
      props: parseTrendsGQLProps(source),
      options: ({ topic, timeRange, interval }) => {
        const { from, to } = getIntervalByTimeRange(timeRange)
        return {
          variables: {
            searchText: normalizeTopic(topic),
            source: source,
            interval: interval,
            to: to.toISOString(),
            from: from.toISOString()
          }
        }
      }
    })
  )

export default compose(...makeAllQueries())(GetTrends)
