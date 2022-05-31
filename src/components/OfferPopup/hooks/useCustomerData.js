import { useQuery } from '@apollo/react-hooks'
import { useUserSubscriptions } from '../../../stores/user/subscriptions'
import { ANNUAL_DISCOUNT_QUERY } from './queries'

export const useCustomerData = ({ isLoggedIn }) => {
  const { isEligibleForSanbaseTrial, loading: userLoading } = useUserSubscriptions()
  const {
    data = {},
    loading: discountLoading,
    error,
  } = useQuery(ANNUAL_DISCOUNT_QUERY, {
    skip: !isLoggedIn,
  })

  return {
    data: {
      ...data,
      isEligibleForSanbaseTrial,
    },
    loading: discountLoading || userLoading,
    error,
  }
}
