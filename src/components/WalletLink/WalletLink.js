import React from 'react'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import Address, { EtherscanLink } from './Address'
import styles from './WalletLink.module.scss'

const WalletLink = ({
  address,
  assets = [],
  isTx = false,
  isExchange = false,
  labels,
  isDesktop,
  isFull,
  showAllLabels,
  priceMetrics
}) => {
  const trigger = (
    <Address
      address={address}
      isTx={isTx}
      isExchange={isExchange}
      asLink={isTx}
      labels={labels}
      isFull={isFull}
      showAllLabels={showAllLabels}
    />
  )

  if (isTx) {
    return (
      <SmoothDropdownItem trigger={trigger}>
        <ul className={styles.wrapper}>
          <li>
            <EtherscanLink
              address={address}
              isTx={isTx}
              className={styles.link}
            >
              Open Etherscan
            </EtherscanLink>
          </li>
        </ul>
      </SmoothDropdownItem>
    )
  } else {
    return (
      <ViewBalanceDialog
        priceMetrics={priceMetrics}
        assets={assets}
        address={address}
        isDesktop={isDesktop}
        trigger={trigger}
      />
    )
  }
}

export default WalletLink
