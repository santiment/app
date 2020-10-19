import React from 'react'
import cx from 'classnames'
import TransactionTableLabels from './TransactionTableLabels'
import styles from './WalletLink.module.scss'

export const makeShortAddresLink = ({
  link,
  isExchange,
  settings: { linkSymbolsCount = 16 } = {}
}) =>
  link.length > 7
    ? link.slice(0, isExchange ? 7 : linkSymbolsCount) + '...'
    : link

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

  const addressShort =
    isFull || typeof link !== 'string'
      ? link
      : makeShortAddresLink({ link, isExchange, settings })
  const showLabel = label || children || addressShort

  const El = asLink ? 'a' : 'div'

  const props = asLink
    ? {
      href: `https://etherscan.io/${isTx ? 'tx' : 'address'}/${address}`,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
    : {}

  return (
    <El {...props} className={cx(styles.etherscanLink, styles.link)}>
      {showLabel}
    </El>
  )
}

const EthLinkWithLabels = ({ isExchange, labels, ...rest }) => {
  return (
    <div className={styles.withLabels}>
      <EtherscanLink {...rest} isExchange={isExchange} />
      {labels && <TransactionTableLabels labels={labels} />}
    </div>
  )
}

export const DefaultAssetLinkWithLabels = ({ address, labels }) => {
  return (
    <div>
      <span className={styles.link}>
        {makeShortAddresLink({ link: address })}
      </span>
      {labels && <TransactionTableLabels labels={labels} />}
    </div>
  )
}

export default EthLinkWithLabels
