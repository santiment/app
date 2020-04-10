import gql from 'graphql-tag'

export const PROMOTER_MUTATION = gql`
  mutation {
    createPromoter {
      email
      currentBalance
      earningsBalance
      paidBalance
      promotions {
        refId
        referralLink
        promoCode
        visitorsCount
        leadsCount
        salesCount
        customersCount
        refundsCount
        cancellationsCount
        salesTotal
        refundsTotal
      }
    }
  }
`

export const SHOW_PROMOTER_QUERY = gql`
  {
    showPromoter {
      email
      currentBalance
      earningsBalance
      paidBalance
      promotions {
        refId
        referralLink
        promoCode
        visitorsCount
        leadsCount
        salesCount
        customersCount
        refundsCount
        cancellationsCount
        salesTotal
        refundsTotal
      }
    }
  }
`
