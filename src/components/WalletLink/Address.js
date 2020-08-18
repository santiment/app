import React from 'react'
import cx from 'classnames'
import TransactionTableLabels from './TransactionTableLabels'
import styles from './WalletLink.module.scss'

export const EtherscanLink = ({
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

const Address = ({ isExchange, labels, ...rest }) => {
  return (
    <>
      <EtherscanLink {...rest} isExchange={isExchange} />
      {labels && <TransactionTableLabels labels={labels} />}
    </>
  )
}

export default Address
