import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const DOMINANCE_QUERY = gql`
  query allProjectsByFunction(
    $metric: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    allProjectsByFunction(
      function: "{\\"args\\":{\\"filters\\":[{\\"args\\":{\\"market_segments\\": [\\"Stablecoin\\"]},\\"name\\":\\"market_segments\\"}]},\\"name\\":\\"selector\\"}"
    ) {
      stats {
        projectsCount
      }
      projects {
        slug
        ticker
        value: aggregatedTimeseriesData(
          metric: $metric
          from: $from
          to: $to
          aggregation: SUM
        )
      }
    }
  }
`

export const useAggregatedProjects = ({ metric, from, to }) => {
  const { data, loading, error } = useQuery(DOMINANCE_QUERY, {
    variables: {
      metric,
      from,
      to
    }
  })

  return {
    data: data ? data.allProjectsByFunction.projects : [],
    loading,
    error
  }
}

export const sortByValue = (a, b) => b.value - a.value
