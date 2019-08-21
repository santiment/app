import gql from 'graphql-tag'

export const generalData = gql`
  fragment generalData on Project {
    id
    name
    slug
    description
    ticker
    coinmarketcapId
  }
`

const ethereumData = gql`
  fragment ethereumData on Project {
    fundsRaisedUsdIcoEndPrice
    ethAddresses {
      address
    }
  }
`

export const project = gql`
  fragment project on Project {
    rank
    marketSegment
    priceUsd
    percentChange24h
    volumeUsd
    volumeChange24h
    ethSpent
    averageDevActivity
    averageDailyActiveAddresses
    marketcapUsd
    signals {
      name
      description
    }
  }
`

export const allProjectsGQL = gql`
  query allProjects($minVolume: Int!) {
    allProjects(minVolume: $minVolume) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const allProjects50GQL = gql`
  query allProjects($minVolume: Int!) {
    allProjects(page: 1, pageSize: 50, minVolume: $minVolume) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const projectBySlugGQL = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const allProjectsForSearchGQL = gql`
  query allProjects($minVolume: Int!) {
    allProjects(minVolume: $minVolume) {
      ...generalData
    }
  }
  ${generalData}
`

export const allErc20ProjectsGQL = gql`
  query allErc20Projects($minVolume: Int!) {
    allErc20Projects(minVolume: $minVolume) {
      ethBalance
      ...generalData
      ...project
      ...ethereumData
    }
  }
  ${generalData}
  ${project}
  ${ethereumData}
`

export const currenciesGQL = gql`
  query allCurrencyProjects($minVolume: Int!) {
    allCurrencyProjects(minVolume: $minVolume) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const allMarketSegmentsGQL = gql`
  {
    allMarketSegments {
      name
      count
    }
  }
`

export const erc20MarketSegmentsGQL = gql`
  {
    erc20MarketSegments {
      name
      count
    }
  }
`

export const currenciesMarketSegmentsGQL = gql`
  {
    currenciesMarketSegments {
      name
      count
    }
  }
`

export const ALL_ERC20_PROJECTS_QUERY = gql`
  {
    allErc20Projects {
      slug
      mainContractAddress
    }
  }
`

export default allProjectsGQL
