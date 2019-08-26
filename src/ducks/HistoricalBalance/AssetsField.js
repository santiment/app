import React, { useState } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Select from '@santiment-network/ui/Search/Select/Select'
import { ALL_ERC20_PROJECTS_QUERY } from '../../pages/Projects/allProjectsGQL'
import { ASSETS_BY_WALLET_QUERY } from './common/queries'
import {
  isPossibleEthAddress,
  mapAssetsHeldByAddressToProps,
  mapErc20AssetsToProps
} from '../Signals/utils/utils'
import { WalletBalanceOptionRenderer } from '../Signals/signalFormManager/signalCrudForm/formParts/metricOptions/MetricOptionsRenderer'

const MAX_ASSETS_COUNT = 5

const AssetsField = ({
  defaultSelected = [],
  isLoading,
  assets = [],
  className = 'assets-select',
  onChange
}) => {
  const [showingAssets, setShowingAssets] = useState(defaultSelected)

  const handleOnChange = selected => {
    if (selected.length <= MAX_ASSETS_COUNT) {
      setShowingAssets(selected)
      onChange(selected)
    }
  }

  return (
    <Select
      multi
      placeholder='For example, Ethereum...'
      options={assets}
      isLoading={isLoading}
      valueKey='slug'
      labelKey='slug'
      onChange={handleOnChange}
      value={showingAssets}
      className={className}
      optionRenderer={WalletBalanceOptionRenderer}
    />
  )
}

const enhance = compose(
  graphql(ALL_ERC20_PROJECTS_QUERY, {
    name: 'allErc20Projects',
    props: mapErc20AssetsToProps,
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
