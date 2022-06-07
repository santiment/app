import { useEffect, useState } from 'react'
import { customerData$ } from 'webkit/stores/user'

export const useCustomerData = () => {
  const [data, setData] = useState({
    isLoggedIn: false,
    sanBalance: 0,
    isEligibleForTrial: false,
    annualDiscount: {},
  })

  useEffect(() => {
    customerData$.subscribe((val) => setData(val))
  }, [])

  return data
}
