import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Select } from '@santiment-network/ui'
import isEqual from 'lodash.isequal'
import { ALL_ERC20_PROJECTS_QUERY } from '../../pages/Projects/allProjectsGQL'
import { ASSETS_BY_WALLET_QUERY } from './common/queries'

const AssetsField = ({
  byAddress,
  defaultSelected = [],
  isLoading,
  assets = [],
  className = 'assets-select',
  onChange
}) => {
  const [showingAssets, setShowingAssets] = useState(defaultSelected)

  const handleOnChange = selected => {
    if (selected.length <= 5) {
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
      onChange={handleOnChange}
      value={showingAssets}
      className={className}
      valueKey='value'
    />
  )
}

const mapToAssets = (data, filter = true) => {
  return data
    .filter(asset => !filter || !!asset.mainContractAddress)
    .map((asset, index) => {
      return { value: asset.slug, label: asset.slug }
    })
}

const mapErc20AssetsToProps = ({
  allErc20Projects: { allErc20Projects, isLoading }
}) => {
  return {
    assets: [
      { value: 'ethereum', label: 'ethereum' },
      ...mapToAssets(allErc20Projects)
    ],
    isLoading: isLoading
  }
}

const mapAssetsHeldByAddressToProps = ({
  assetsByWallet: { assetsHeldByAddress = [], loading }
}) => {
  const assets = mapToAssets(assetsHeldByAddress, false)
  return {
    assets: assets,
    isLoading: loading
  }
}

const enhance = compose(
  graphql(ALL_ERC20_PROJECTS_QUERY, {
    name: 'allErc20Projects',
    skip: ({ byAddress }) => {
      return !!byAddress
    },
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
      return !byAddress
    },
    options: ({ byAddress }) => {
      return {
        variables: {
          address: byAddress
        },
        fetchPolicy: 'cache-first'
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
