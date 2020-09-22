import React from 'react'
import cx from 'classnames'
import TransactionTableLabels from './TransactionTableLabels'
import styles from './WalletLink.module.scss'

export const makeShortEthLink = ({
  link,
  isExchange,
  settings: { linkSymbolsCount = 16 } = {}
}) => link.slice(0, isExchange ? 7 : linkSymbolsCount) + '...'

export const EtherscanLink = ({
  address = '',
  isTx,
  isExchange,
  label,
  isFull,
  asLink = true,
  settings,
  children
}) => {
  const link = children || address
  const addressShort = isFull
    ? link
    : makeShortEthLink({ link, isExchange, settings })

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

const Address = ({ isExchange, labels, ...rest }) => {
  return (
    <>
      <EtherscanLink {...rest} isExchange={isExchange} />
      {labels && <TransactionTableLabels labels={labels} />}
    </>
  )
}

export default Address
