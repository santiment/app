import React from 'react'
import cx from 'classnames'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import TransactionTableLabels from './TransactionTableLabels'
import styles from './WalletLink.module.scss'

const WalletLink = ({
  address,
  assets = [],
  isTx = false,
  isExchange = false,
  labels,
  isDesktop
}) => {
  const trigger = (
    <Address
      address={address}
      isTx={isTx}
      isExchange={isExchange}
      asLink={isTx}
      labels={labels}
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
        assets={assets}
        address={address}
        isDesktop={isDesktop}
        trigger={trigger}
      />
    )
  }
}

const EtherscanLink = ({
  address = '',
  isTx,
  isExchange,
  label,
  isFull,
  asLink = true,
  children
}) => {
  const link = children || address
  const addressShort = isFull
    ? link
    : link.slice(0, isExchange ? 7 : 16) + '...'
  return (
    <a
      href={
        asLink
          ? `https://etherscan.io/${isTx ? 'tx' : 'address'}/${address}`
          : '#'
      }
      className={cx(styles.etherscanLink, styles.link)}
    >
      {label || children || addressShort}
    </a>
  )
}

export const Address = ({ isExchange, labels, ...rest }) => {
  return (
    <>
      <EtherscanLink {...rest} isExchange={isExchange} />
      {labels && <TransactionTableLabels labels={labels} />}
    </>
  )
}

export default WalletLink
