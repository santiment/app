import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { trendsExploreGQL } from '../../components/Trends/trendsExploreGQL'
import { getTimeIntervalFromToday, MONTH, DAY } from './../../utils/dates.js'

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

const customTimeRange = timeRange => {
  switch (timeRange) {
    case '1w':
      return getTimeIntervalFromToday(-7, DAY)
    case '1m':
      return getTimeIntervalFromToday(-1, MONTH)
    case '3m':
      return getTimeIntervalFromToday(-3, MONTH)
    case '6m':
      return getTimeIntervalFromToday(-6, MONTH)
    default:
      return getTimeIntervalFromToday(-1, MONTH)
  }
}

const makeAllQueries = () =>
  ['TELEGRAM', 'PROFESSIONAL_TRADERS_CHAT', 'REDDIT', 'DISCORD'].map(source =>
    graphql(trendsExploreGQL, {
      props: parseTrendsGQLProps(source),
      options: ({ topic, timeRange, interval }) => {
        const { from, to } = customTimeRange(timeRange)
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
