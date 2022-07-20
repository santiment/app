import { useEffect, useState } from 'react'
import { get } from 'svelte/store'
import { customerData$ } from 'webkit/stores/user'

const DEFAULT = get(customerData$)

export const useCustomerData = () => {
  const [data, setData] = useState(DEFAULT)

  useEffect(() => customerData$.subscribe((val) => setData(val)), [])

  return data
}
