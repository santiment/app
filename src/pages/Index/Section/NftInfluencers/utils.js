import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import accounts from './accounts.json'
import styles from './index.module.scss'

export const HOME_INDEX = [
  '#',
  'Twitter NFT Influencer',
  'Activity',
  'When',
  'Price',
  'Marketplace'
]

export const PAGE_INDEX = [
  '#',
  'Twitter NFT Influencer',
  'Activity',
  'NFT collection name',
  'Transaction',
  'When',
  'Price',
  'Quantity',
  'Marketplace'
]

export const DEFAULT_SORTING = [
  {
    id: '#',
    desc: false
  }
]

const getInfluencers = original => ({
  to: original.toAddress.labelKey === 'NFT_INFLUENCER',
  toAddress: original.toAddress.address,
  from: original.fromAddress.labelKey === 'NFT_INFLUENCER',
  fromAddress: original.fromAddress.address
})

export const Activity = ({ original }) => {
  const { to, from } = getInfluencers(original)

  if (to && !from) {
    return (
      <div>
        <Icon type='buy' className={cx(styles.icon, styles.mr)} /> buy
      </div>
    )
  }

  if (from && !to) {
    return (
      <div>
        <Icon type='sell' className={cx(styles.icon, styles.mr, styles.sell)} />{' '}
        sell
      </div>
    )
  }

  return null
}

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)

export const Marketplace = ({ marketplace }) => (
  <>
    {capitalizeFirstLetter(marketplace)}{' '}
    {/* <a href='/FIXME' target='_blank' rel='noopener noreferrer'>
      <Icon type='external-link' className={cx(styles.icon, styles.ml)} />
    </a> */}
  </>
)

export function getTwitterAccount (original) {
  const { to, toAddress, from, fromAddress } = getInfluencers(original)
  const address = to ? toAddress : from ? fromAddress : undefined
  if (!address) return null
  return accounts.find(
    _account => _account.Address.toUpperCase() === address.toUpperCase()
  )
}

const truncate = address => `${address.substring(0, 5)}...`

const Address = ({ address }) => (
  <a
    href={`/labs/balance?address=${address}`}
    className={styles.address}
    title={address}
  >
    {truncate(address)}
  </a>
)

export const Transaction = ({ from, to }) => (
  <div className={styles.transaction}>
    from: <Address address={from} />
    to: <Address address={to} />
  </div>
)
