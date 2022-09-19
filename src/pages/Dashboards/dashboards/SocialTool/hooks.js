import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const SOCIAL_DOMINANCE_TRENDING_WORDS_QUERY = gql`
  {
    socialDominanceTrendingWords
  }
`

export function useSocialDominanceTrendingWords() {
  const { data, loading, error } = useQuery(SOCIAL_DOMINANCE_TRENDING_WORDS_QUERY)

  return { data: data ? data.socialDominanceTrendingWords : 0, loading, error }
}
