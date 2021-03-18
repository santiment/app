import gql from 'graphql-tag'

export const PRICE_OHLC_QUERY = gql`
  query ohlc(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    ohlc(from: $from, to: $to, interval: $interval, slug: $slug) {
      d: datetime
      o: openPriceUsd
      h: highPriceUsd
      l: lowPriceUsd
      c: closePriceUsd
    }
  }
`

export const newOhlcPreTransformer = ({ key }) => {
  const dataMapper = ({ d, o, h, l, c }) => ({
    datetime: d,
    [key]: {
      open: o,
      high: h,
      low: l,
      close: c
    }
  })

  return ({ data: { ohlc } }) => ohlc.map(dataMapper)
}
