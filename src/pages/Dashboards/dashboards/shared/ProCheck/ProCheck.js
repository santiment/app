import React, { Fragment, useMemo } from 'react'
import CheckProPaywall from '../../../../../ducks/Stablecoins/CheckProPaywall'

const ProCheck = ({ isPaywalActive = false, children }) => {
  const El = useMemo(() => {
    return isPaywalActive ? CheckProPaywall : Fragment
  }, [isPaywalActive])

  return <El>{children}</El>
}

export default ProCheck
