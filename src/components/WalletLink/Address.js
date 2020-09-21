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

  const El = asLink ? 'a' : 'div'

  return (
    <El
      href={
        asLink
          ? `https://etherscan.io/${isTx ? 'tx' : 'address'}/${address}`
          : '#'
      }
      className={cx(styles.etherscanLink, styles.link)}
    >
      {label || children || addressShort}
    </El>
  )
}

const Address = ({ isExchange, labels, showAllLabels, ...rest }) => {
  return (
    <>
      <EtherscanLink {...rest} isExchange={isExchange} />
      {labels && (
        <TransactionTableLabels labels={labels} showAll={showAllLabels} />
      )}
    </>
  )
}

export default Address
