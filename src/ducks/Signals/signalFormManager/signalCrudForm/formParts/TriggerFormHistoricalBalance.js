import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import { ALL_ERC20_PROJECTS_QUERY } from '../../../../Watchlists/gql/allProjectsGQL'
import { ASSETS_BY_WALLET_QUERY } from '../../../../HistoricalBalance/common/queries'
import {
  isPossibleEthAddress,
  mapAssetsHeldByAddressToProps,
  hasEthAddress
} from '../../../utils/utils'
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import { NOT_VALID_ETH_ADDRESS } from '../../../utils/constants'
import styles from '../signal/TriggerForm.module.scss'

const isInHeldAssets = (heldAssets, checking) => {
  return checking.every(({ value: chValue, slug: chSlug }) =>
    heldAssets.some(({ slug }) => slug === chSlug || slug === chValue)
  )
}

const ETHEREUM = {
  id: 57,
  slug: 'ethereum',
  ticker: 'ETH',
  infrastructure: 'ETH',
  name: 'ethereum'
}

const isErc20Assets = (target, allErc20Projects) =>
  target.value === ETHEREUM.slug ||
  target.slug === ETHEREUM.slug ||
  (Array.isArray(target)
    ? isInHeldAssets(allErc20Projects, target)
    : isInHeldAssets(allErc20Projects, [target]))

const mapAssetsToAllProjects = (all, heldAssets) =>
  heldAssets.reduce((acc, { slug: itemSlug, value: itemValue, balance }) => {
    const foundInAll = all.find(
      ({ slug }) => slug === itemSlug || slug === itemValue
    )
    if (foundInAll) {
      foundInAll.balance = balance
      acc.push(foundInAll)
    }
    return acc
  }, [])

const propTypes = {
  metaFormSettings: PropTypes.any,
  values: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  byAddress: PropTypes.any,
  assets: PropTypes.array
}

const getFromAll = (erc20List, { value, slug }) =>
  erc20List.find(
    ({ slug: currentSlug }) => currentSlug === value || currentSlug === slug
  )

const isEthAddress = data => {
  if (Array.isArray(data)) {
    return data.every(({ value }) => isPossibleEthAddress(value))
  } else {
    return isPossibleEthAddress(data)
  }
}

const TriggerFormHistoricalBalance = ({
  data: { allErc20Projects = [] } = {},
  metaFormSettings: { ethAddress: metaEthAddress, target: metaTarget },
  assets = [],
  setFieldValue,
  values: { target, ethAddress },
  isLoading = false
}) => {
  const [erc20List, setErc20] = useState(allErc20Projects)
  const [heldAssets, setHeldAssets] = useState(assets)

  const metaMappedToAll = erc20List.length
    ? mapAssetsToAllProjects(
      erc20List,
      Array.isArray(metaTarget.value) ? metaTarget.value : [metaTarget.value]
    )
    : []

  const validateTarget = () => {
    let asset
    if (target.length === 1 && !target[0].slug) {
      asset = getFromAll(erc20List, target[0])
    } else if (target && !target.slug) {
      asset = getFromAll(erc20List, target)
    }

    asset &&
      setFieldValue('target', hasEthAddress(ethAddress) ? asset : [asset])
  }

  const setAddress = address => setFieldValue('ethAddress', address)

  const validateAddressField = assets => {
    if (erc20List.length && !isErc20Assets(assets, erc20List)) {
      setAddress('')
      return
    }

    if (assets.length > 1) {
      setAddress('')
      return
    }

    if (metaEthAddress && !hasEthAddress(ethAddress)) {
      if (assets.length === 1) {
        if (
          isInHeldAssets(metaMappedToAll, assets) ||
          isInHeldAssets(heldAssets, assets)
        ) {
          setAddress(metaEthAddress)
        } else {
          setAddress('')
        }
      }
    } else if (disabledWalletField) {
      setAddress('')
    }
  }

  useEffect(
    () => {
      allErc20Projects &&
        allErc20Projects.length &&
        !erc20List.length &&
        setErc20(allErc20Projects)
      assets && assets.length && setHeldAssets(assets)
    },
    [allErc20Projects, assets]
  )

  useEffect(() => validateTarget(), [target, ethAddress])

  useEffect(
    () =>
      setFieldValue(
        'isEthOrErc20Error',
        isErc20Assets(target, erc20List) ? !hasEthAddress(ethAddress) : false
      ),
    [target, ethAddress, erc20List]
  )

  useEffect(() => validateAddressField(target), [target])

  useEffect(() => setFieldValue('isLoading', isLoading), [isLoading])

  useEffect(
    () => {
      if (!hasEthAddress(ethAddress)) {
        if (!Array.isArray(target)) {
          setFieldValue('target', [target])
        }
      }
    },
    [ethAddress]
  )

  const disabledWalletField =
    (!hasEthAddress(ethAddress) && target.length > 1) ||
    (erc20List.length && !isErc20Assets(target, erc20List))

  const selectableProjects =
    hasEthAddress(ethAddress) && !disabledWalletField && heldAssets.length > 0
      ? mapAssetsToAllProjects(erc20List, heldAssets)
      : erc20List

  return (
    <>
      <div className={cx(styles.row, styles.rowTop)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <FormikLabel text='Wallet' />
          <FormikSelect
            disabled={!!disabledWalletField}
            isCreatable
            multi
            name='ethAddress'
            validator={value => {
              return disabledWalletField || isEthAddress(value)
            }}
            notificationText={NOT_VALID_ETH_ADDRESS}
            placeholder={
              disabledWalletField
                ? 'Only for single ETH and ERC20 asset'
                : 'Wallet address'
            }
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <TriggerProjectsSelector
            isLoading={isLoading}
            name='target'
            target={target}
            projects={selectableProjects}
            setFieldValue={setFieldValue}
            isSingle
          />
        </div>
      </div>
    </>
  )
}

const mapDataToProps = ({
  Projects: { allErc20Projects = [], loading },
  ownProps
}) => {
  if (
    allErc20Projects &&
    allErc20Projects.length > 0 &&
    !allErc20Projects.find(({ slug }) => slug === ETHEREUM.slug)
  ) {
    allErc20Projects.push({
      ...ETHEREUM
    })
  }

  return {
    ...ownProps,
    data: {
      allErc20Projects
    },
    isLoading: loading
  }
}

const enhance = compose(
  graphql(ALL_ERC20_PROJECTS_QUERY, {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all',
        variables: { minVolume: 0 }
      }
    }
  }),
  graphql(ASSETS_BY_WALLET_QUERY, {
    name: 'assetsByWallet',
    props: mapAssetsHeldByAddressToProps,
    skip: ({ byAddress }) =>
      !byAddress || (Array.isArray(byAddress) && byAddress.length !== 1),
    options: ({ byAddress }) => {
      return {
        variables: {
          address: Array.isArray(byAddress) ? byAddress[0].value : byAddress
        },
        errorPolicy: 'all'
      }
    }
  })
)

TriggerFormHistoricalBalance.propTypes = propTypes

export default enhance(TriggerFormHistoricalBalance)
