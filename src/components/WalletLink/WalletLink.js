import React from 'react'
import * as qs from 'query-string'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Label from '@santiment-network/ui/Label'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import styles from './WalletLink.module.scss'
import ViewBalanceDialog from './ViewBalanceDialog'

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
}) => (
  <SmoothDropdownItem
    trigger={<Address address={address} isTx={isTx} isExchange={isExchange} />}
  >
    <ul className={styles.wrapper}>
      {!isTx && (
        <li>
          <ViewBalanceDialog
            assets={assets}
            address={address}
            isDesktop={isDesktop}
          />
        </li>
      )}
      <li>
        <EtherscanLink address={address} isTx={isTx} className={styles.link}>
          Open Etherscan
        </EtherscanLink>
      </li>
    </ul>
  </SmoothDropdownItem>
)

const EtherscanLink = ({ address = '', isTx, isExchange, children }) => {
  const addressShort =
    (children || address).slice(0, isExchange ? 7 : 16) + '...'
  return (
    <a
      href={`https://etherscan.io/${isTx ? 'tx' : 'address'}/${address}`}
      className={cx(styles.etherscanLink, styles.link)}
    >
      {children || addressShort}
    </a>
  )
}

const Address = ({ isExchange, ...rest }) => (
  <>
    <EtherscanLink {...rest} isExchange={isExchange} />
    {isExchange && <Label className={styles.exchange}>exchange</Label>}
  </>
)

export const getSearch = ({ address, assets }) =>
  '?' + qs.stringify({ address, assets }, { arrayFormat: 'bracket' })

WalletLink.propTypes = propTypes

export default WalletLink
