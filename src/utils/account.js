import { getCurrentSanbaseSubscription } from './plans'
import { PRO } from '../components/Navbar/NavbarProfileDropdown'

export const checkIsProUser = data => {
  const sanbaseSubscription = getCurrentSanbaseSubscription(data)

  return sanbaseSubscription && sanbaseSubscription.plan
    ? sanbaseSubscription.plan.name === PRO
    : false
}

export const checkIsProState = ({ user: { data } }) => {
  return {
    isProSanbase: checkIsProUser(data)
  }
}
