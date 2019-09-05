import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Label from '@santiment-network/ui/Label'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import styles from './WalletLink.module.scss'

const propTypes = {
  address: PropTypes.string.isRequired,
  assets: PropTypes.arrayOf(PropTypes.string),
  isTx: PropTypes.bool,
  isExchange: PropTypes.bool
}

const WalletLink = ({
  address,
  assets = [],
  isTx = false,
  isExchange = false,
  isDesktop
}) => {
  const trigger = (
    <Address
      address={address}
      isTx={isTx}
      isExchange={isExchange}
      asLink={isTx}
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

export const Address = ({ isExchange, ...rest }) => (
  <>
    <EtherscanLink {...rest} isExchange={isExchange} />
    {isExchange && <Label className={styles.exchange}>exchange</Label>}
  </>
)
WalletLink.propTypes = propTypes

export default WalletLink
