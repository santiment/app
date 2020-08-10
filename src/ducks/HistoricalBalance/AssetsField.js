import React, { useState } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import { ALL_ERC20_PROJECTS_QUERY } from '../Watchlists/gql/allProjectsGQL'
import { ASSETS_BY_WALLET_QUERY } from './common/queries'
import {
  isPossibleEthAddress,
  mapAssetsHeldByAddressToProps,
  mapErc20AssetsToProps
} from '../Signals/utils/utils'
import { WalletBalanceOptionRenderer } from '../Signals/signalFormManager/signalCrudForm/formParts/metricOptions/MetricOptionsRenderer'
import styles from './AssetsField.module.scss'

const MAX_ASSETS_COUNT = 5

const AssetsField = ({
  defaultSelected = [],
  isLoading,
  assets = [],
  className = 'assets-select',
  onChange
}) => {
  const [showingAssets, setShowingAssets] = useState(
    defaultSelected.map(item =>
      typeof item === 'object' ? item : { slug: item }
    )
  )

  const handleOnChange = selected => {
    if (selected.length <= MAX_ASSETS_COUNT) {
      setShowingAssets(selected)
      onChange(selected)
    }
  }

  return (
    <div className={styles.container}>
      <Select
        multi
        placeholder='For example, Ethereum...'
        options={assets}
        valueKey='slug'
        labelKey='slug'
        onChange={handleOnChange}
        value={showingAssets}
        className={className}
        optionRenderer={WalletBalanceOptionRenderer}
      />
      {isLoading && <Loader className={styles.loader} />}
    </div>
  )
}

const enhance = compose(
  graphql(ALL_ERC20_PROJECTS_QUERY, {
    name: 'allErc20Projects',
    props: mapErc20AssetsToProps,
    skip: ({ byAddress }) => !!byAddress,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(ASSETS_BY_WALLET_QUERY, {
    name: 'assetsByWallet',
    props: mapAssetsHeldByAddressToProps,
    skip: ({ byAddress }) => {
      return !byAddress || !isPossibleEthAddress(byAddress)
    },
    options: ({ byAddress }) => {
      return {
        variables: {
          address: byAddress
        }
      }
    }
  })
)

AssetsField.propTypes = {
  defaultSelected: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  byAddress: PropTypes.string,
  assets: PropTypes.array
}

export default enhance(AssetsField)
