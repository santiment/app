import React, { Fragment } from 'react'
import * as qs from 'query-string'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import { Label } from 'semantic-ui-react'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
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
  isExchange = false
}) => (
  <SmoothDropdownItem
    trigger={<Address address={address} isTx={isTx} isExchange={isExchange} />}
  >
    <ul className={styles.wrapper}>
      {!isTx && (
        <li>
          <Button
            variant='fill'
            accent='positive'
            as={Link}
            to={{
              pathname: '/labs/balance',
              search: getSearch({ address, assets })
            }}
          >
            Show historical balance
          </Button>
        </li>
      )}
      <li>
        <EtherscanLink address={address} isTx={isTx}>
          Open Etherscan
        </EtherscanLink>
      </li>
    </ul>
  </SmoothDropdownItem>
)

const EtherscanLink = ({ address, isTx, children }) => (
  <a href={`https://etherscan.io/${isTx ? 'tx' : 'address'}/${address}`}>
    {children || address}
  </a>
)

const Address = ({ isExchange, ...rest }) => (
  <Fragment>
    {isExchange && <Label color='yellow'>exchange</Label>}
    <EtherscanLink {...rest} />
  </Fragment>
)

const getSearch = ({ address, assets }) =>
  '?' + qs.stringify({ address, assets }, { arrayFormat: 'bracket' })

WalletLink.propTypes = propTypes

export default WalletLink
