import React from 'react'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import ActionLabels from './ActionLabels'
import styles from './WalletLink.module.scss'

const WalletLink = ({ address, labels, isTx = false, ...rest }) => {
  if (!address && !labels) {
    return null
  }

  return <EthWalletLink address={address} labels={labels} isTx={isTx} {...rest} />
}

const EthWalletLink = ({
  assets = [],
  isExchange = false,
  trigger: inputTrigger,
  settings,
  isFull,
  priceMetrics,
  labels,
  isTx,
  address,
  className,
  children,
}) => {
  return (
    <ActionLabels
      address={address}
      isTx={isTx}
      isExchange={isExchange}
      asLink={isTx}
      labels={labels}
      settings={settings}
      isFull={isFull}
      className={className}
      content={children}
    />
  )
}

export default WalletLink
