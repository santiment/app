import React from 'react'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import ActionLabels, { DefaultAssetLinkWithLabels } from './ActionLabels'
import { isEthStrictHashTx } from '../../utils/utils'
import styles from './WalletLink.module.scss'

const WalletLink = ({ address, labels, isTx = false, ...rest }) => {
  if (!address && !labels) {
    return null
  }

  const showDialog = address && (isTx ? isEthStrictHashTx(address) : true)

  if (!showDialog) {
    return (
      <SmoothDropdownItem
        trigger={
          <DefaultAssetLinkWithLabels address={address} labels={labels} />
        }
      >
        <ul className={styles.wrapper}>
          <li>{address}</li>
        </ul>
      </SmoothDropdownItem>
    )
  }

  return (
    <EthWalletLink address={address} labels={labels} isTx={isTx} {...rest} />
  )
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
  className
}) => {
  const trigger = inputTrigger || (
    <ActionLabels
      address={address}
      isTx={isTx}
      isExchange={isExchange}
      asLink={isTx}
      labels={labels}
      settings={settings}
      isFull={isFull}
      className={className}
    />
  )

  if (isTx) {
    return (
      <SmoothDropdownItem trigger={trigger}>
        <ul className={styles.wrapper}>
          <li>
            <ActionLabels address={address} isTx={isTx} settings={settings}>
              Open Etherscan
            </ActionLabels>
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
        trigger={trigger}
      />
    )
  }
}

export default WalletLink
