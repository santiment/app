import React from 'react'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import EthLinkWithLabels, {
  DefaultAssetLinkWithLabels
} from './EthLinkWithLabels'
import { isEthStrictAddress, isEthStrictHashTx } from '../../utils/utils'
import styles from './WalletLink.module.scss'

const WalletLink = ({ address, labels, isTx = false, ...rest }) => {
  if (!address && !labels) {
    return null
  }

  const isEth =
    address && (isTx ? isEthStrictHashTx(address) : isEthStrictAddress(address))

  if (!isEth) {
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
  address
}) => {
  const trigger = inputTrigger || (
    <EthLinkWithLabels
      address={address}
      isTx={isTx}
      isExchange={isExchange}
      asLink={isTx}
      labels={labels}
      settings={settings}
      isFull={isFull}
    />
  )

  if (isTx) {
    return (
      <SmoothDropdownItem trigger={trigger}>
        <ul className={styles.wrapper}>
          <li>
            <EthLinkWithLabels
              address={address}
              isTx={isTx}
              settings={settings}
            >
              Open Etherscan
            </EthLinkWithLabels>
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
