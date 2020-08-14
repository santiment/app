import { useQuery } from '@apollo/react-hooks'

const MARKET_CAP_QUERY = `
  query getMetric(
    $slug: String
    $from: DateTime!
    $to: DateTime!
  ) {
    getMetric(metric: "marketcap_usd") {
      timeseriesData(selector: {slug: $slug, market_segments: ["Stablecoin"], ignored_slugs: ["dai", "sai"]}, from: $from, to: $to, interval: "12h") {
        datetime
        value
      }
    }
  }
`

export const useMarketcapData = ({ slug = '', from, to }) => {
  const { data, loading, error } = useQuery(MARKET_CAP_QUERY, {
    skip: !from || !to,
    variables: { slug, from, to }
  })

  return { data: data ? data.getMetric : [], loading, error }
}
