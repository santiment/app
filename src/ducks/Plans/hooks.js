import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { PLANS_QUERY } from '../../queries/plans'
import { findSanbasePlan as sanbaseProductFinder } from '../../utils/plans'

export function usePlans () {
  const [productPlans, setProductPlans] = useState([])
  const { data, loading } = useQuery(PLANS_QUERY)

  useEffect(
    () => {
      if (data) {
        const product = data.productsWithPlans.find(sanbaseProductFinder)
        if (product) {
          const plans = product.plans.filter(
            ({ isDeprecated }) => !isDeprecated
          )
          setProductPlans(plans)
        }
      }
    },
    [data]
  )

  return [productPlans, loading]
}
