import gql from 'graphql-tag'

export const ANNUAL_DISCOUNT_QUERY = gql`
  query annualDiscount {
    annualDiscount: checkAnnualDiscountEligibility {
      isEligible
      discount {
        percentOff
        expireAt
      }
    }
  }
`
