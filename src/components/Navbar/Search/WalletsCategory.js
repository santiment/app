import React, { useMemo } from 'react'
import cx from 'classnames'
import Category, { Button } from './Category'
import styles from './Category.module.scss'
import { getAddressInfrastructure } from '../../../utils/address'

const DEFAULT_SUGGESTIONS = []
const WALLET_LINK = '/labs/balance?address='

const propsAccessor = ({ word, key = word, As }) => ({
  key,
  As,
  to: WALLET_LINK + word
})

const Wallet = ({ address }) => address
const Lookup = ({ address, className }) => (
  <Button to={WALLET_LINK + address} className={cx(className, styles.lookup)}>
    Lookup wallet
  </Button>
)

const buildLookupSuggestion = searchTerm => [
  {
    key: '__lookup__',
    As: ({ className }) => <Lookup address={searchTerm} className={className} />
  }
]

const TrendingWordsCategory = ({ searchTerm, ...props }) => {
  const suggestions = useMemo(
    () =>
      getAddressInfrastructure(searchTerm)
        ? buildLookupSuggestion(searchTerm)
        : DEFAULT_SUGGESTIONS,
    [searchTerm]
  )

  return suggestions.length ? (
    <Category
      {...props}
      title='Wallets'
      items={suggestions}
      Item={Wallet}
      propsAccessor={propsAccessor}
    />
  ) : null
}

export default TrendingWordsCategory
