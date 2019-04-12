import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Label } from '@santiment-network/ui'
import {
  formatCryptoCurrency,
  formatNumber,
  millify
} from './../../utils/formatting'
import WalletLink from './../../components/WalletLink/WalletLink'
import SmoothDropdown from './../../components/SmoothDropdown/SmoothDropdown'
import './FinancialsBlock.css'

const propTypes = {
  projectTransparencyStatus: PropTypes.string
}

export const collectedField = (currency, amount) => {
  if (currency === 'USD') {
    return formatNumber(amount, { currency: 'USD' })
  }
  return formatCryptoCurrency(currency, formatNumber(amount))
}

const showStatus = status => {
  if (status === 'Certified') {
    return (
      <Label variant='fill' accent='jungle-green'>
        Certified
      </Label>
    )
  }
  return status || 'Not Listed'
}

const FinancialsBlock = ({
  projectTransparencyStatus,
  fundsRaisedIcos,
  ethSpent = null,
  ethBalance = null,
  btcBalance = null,
  ethAddresses = [],
  slug,
  isERC20
}) => (
  <div>
    Project Transparency:&nbsp;
    {isERC20 ? showStatus(projectTransparencyStatus) : 'Not applicable'}
    <hr />
    {fundsRaisedIcos && fundsRaisedIcos.length !== 0 && (
      <div className='row-info'>
        <div>Collected</div>
        <div className='value'>
          {fundsRaisedIcos
            ? fundsRaisedIcos.map((amountIco, index) => {
              return (
                <div key={index}>
                  {collectedField(amountIco.currencyCode, amountIco.amount)}
                </div>
              )
            })
            : '-'}
        </div>
      </div>
    )}
    {ethAddresses && ethAddresses.length > 0 && (
      <Fragment>
        {ethBalance !== undefined && (
          <div
            className={cx({
              'row-info wallets': true,
              'info-disabled': ethAddresses.length === 0
            })}
          >
            <div>Wallet Balances</div>
          </div>
        )}
        <SmoothDropdown verticalOffset={0} verticalMotion>
          {ethAddresses && ethAddresses.length > 0 && (
            <div className='row-info wallets-balance'>
              {ethAddresses.map((wallet, index) => (
                <div key={index}>
                  <div className='wallets-addresses'>
                    <WalletLink
                      address={wallet.address}
                      assets={[slug, 'ethereum']}
                    />
                    <span>ETH {millify(wallet.balance, 2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SmoothDropdown>
        {ethBalance !== undefined && (
          <div
            className={cx({
              'row-info': true,
              'info-disabled': ethAddresses.length === 0
            })}
          >
            <div>Total Balance</div>
            {`ETH ${millify(ethBalance, 2)}`}
          </div>
        )}
        {ethSpent !== undefined && (
          <div
            className={cx({
              'row-info': true,
              'info-disabled': ethBalance === undefined
            })}
          >
            <div>ETH Spent 30d</div>
            <div style={{ textAlign: 'right' }}>
              {`ETH ${millify(ethSpent, 2)}`}
            </div>
          </div>
        )}
      </Fragment>
    )}
  </div>
)

FinancialsBlock.propTypes = propTypes

export default FinancialsBlock
