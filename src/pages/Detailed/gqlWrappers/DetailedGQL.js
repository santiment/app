import gql from 'graphql-tag'

export const projectBySlugGQL = gql`
  query projectBySlugGQL(
    $slug: String!
    $from: DateTime
    $fromOverTime: DateTime
    $to: DateTime
    $interval: interval!
  ) {
    projectBySlug(slug: $slug) {
      id
      name
      slug
      ticker
      description
      websiteLink
      email
      blogLink
      telegramLink
      facebookLink
      githubLinks
      redditLink
      twitterLink
      whitepaperLink
      slackLink
      infrastructure
      btcBalance
      tokenAddress
      mainContractAddress
      fundsRaisedIcos {
        amount
        currencyCode
      }
      initialIco {
        id
        tokenUsdIcoPrice
      }
      icoPrice
      roiUsd
      priceUsd
      priceBtc
      volumeUsd
      ethBalance
      ethAddresses {
        balance
        address
      }

      ethTopTransactions(from: $from, to: $to) {
        datetime
        trxValue
        trxHash
        fromAddress {
          address
          isExchange
          labels {
            name
            metadata
          }
        }
        toAddress {
          address
          isExchange
          labels {
            name
            metadata
          }
        }
      }

      tokenTopTransactions(from: $from, to: $to) {
        datetime
        trxValue
        trxHash
        fromAddress {
          address
          isExchange
          labels {
            name
            metadata
          }
        }
        toAddress {
          address
          isExchange
          labels {
            name
            metadata
          }
        }
      }

      ethSpentOverTime(from: $fromOverTime, to: $to, interval: $interval) {
        datetime
        ethSpent
      }
      ethSpent
      marketcapUsd
      rank
      totalSupply
      percentChange24h
      percentChange7d
      devActivity30: averageDevActivity
      devActivity60: averageDevActivity(days: 60)
    }
  }
`

export const HistoryPriceByTickerGQL = gql`
  query queryHistoryPrice(
    $ticker: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    historyPrice(ticker: $ticker, from: $from, to: $to, interval: $interval) {
      priceBtc
      priceUsd
      volume
      datetime
      marketcap
    }
  }
`
