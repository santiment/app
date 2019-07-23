import React, { useState, useEffect, Fragment } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import {
  ALL_ERC20_PROJECTS_QUERY,
  allProjectsForSearchGQL
} from '../../../../../pages/Projects/allProjectsGQL'
import { ASSETS_BY_WALLET_QUERY } from '../../../../HistoricalBalance/common/queries'
import {
  mapAssetsHeldByAddressToProps,
  isPossibleEthAddress
} from '../../../utils/utils'
import { TriggerProjectsSelector } from './ProjectsSelector/TriggerProjectsSelector'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import styles from '../signal/TriggerForm.module.scss'

const isInHeldAssets = (heldAssets, checking) =>
  checking.every(checkingAsset =>
    heldAssets.some(({ slug }) => slug === checkingAsset.slug)
  )

const isErc20Assets = (target, allErc20Projects) =>
  target.value === 'ethereum' ||
  (Array.isArray(target)
    ? isInHeldAssets(allErc20Projects, target)
    : isInHeldAssets(allErc20Projects, [target]))

const mapAssetsToAllProjects = (all, heldAssets) =>
  heldAssets.reduce((acc, { slug: itemSlug, value: itemValue }) => {
    const foundInAll = all.find(
      ({ slug }) => slug === itemSlug || slug === itemValue
    )
    if (foundInAll) {
      acc.push(foundInAll)
    }
    return acc
  }, [])

const propTypes = {
  metaFormSettings: PropTypes.any,
  values: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  byAddress: PropTypes.string,
  assets: PropTypes.array
}

const getFromAll = (allList, { value, slug }) =>
  allList.find(
    ({ slug: currentSlug }) => currentSlug === value || currentSlug === slug
  )

const TriggerFormHistoricalBalance = ({
  data: { allErc20Projects = [], allProjects = [] } = {},
  metaFormSettings: { ethAddress: metaEthAddress, target: metaTarget },
  assets = [],
  setFieldValue,
  values,
  isLoading = false
}) => {
  const { target, ethAddress } = values

  const isMulti = target && Array.isArray(target)

  const [erc20List, setErc20] = useState(allErc20Projects)
  const [allList, setAll] = useState(allProjects)
  const [heldAssets, setHeldAssets] = useState(assets)

  const metaMappedToAll = mapAssetsToAllProjects(allList, metaTarget.value)

  const validateTarget = () => {
    let asset
    if (isMulti && target.length === 1 && !target[0].slug) {
      asset = getFromAll(allList, target[0])
    } else if (!isMulti && target && !target.slug) {
      asset = getFromAll(allList, target)
    }

    asset && setFieldValue('target', ethAddress ? asset : [asset])
  }

  const setAddress = address => setFieldValue('ethAddress', address)

  const validateAddressField = assets => {
    if (!isErc20Assets(assets, erc20List)) {
      setAddress('')
      return
    }

    if (metaEthAddress && !ethAddress) {
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
      allErc20Projects && allErc20Projects.length && setErc20(allErc20Projects)
      allProjects && allProjects.length && setAll(allProjects)
      assets && assets.length && setHeldAssets(assets)
    },
    [allErc20Projects, allProjects, assets]
  )

  useEffect(
    () => {
      validateTarget()
    },
    [target, ethAddress]
  )

  useEffect(
    () => {
      validateAddressField(target)
    },
    [target]
  )

  const disabledWalletField =
    (!ethAddress && (isMulti && target.length > 1)) ||
    !isErc20Assets(target, erc20List)

  const selectableProjects =
    ethAddress && !disabledWalletField
      ? mapAssetsToAllProjects(allList, heldAssets)
      : allList

  return (
    <>
      <div className={cx(styles.row)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <FormikLabel text='Wallet' />
          <FormikInput
            disabled={disabledWalletField}
            validator={isPossibleEthAddress}
            name='ethAddress'
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
          {isMulti && (
            <TriggerProjectsSelector
              name='target'
              values={values}
              projects={selectableProjects}
              setFieldValue={setFieldValue}
            />
          )}
          {!isMulti && (
            <FormikSelect
              name='target'
              disalbed={isLoading}
              isLoading={isLoading}
              isClearable={false}
              placeholder='Pick an asset'
              options={selectableProjects}
              valueKey='slug'
              labelKey='slug'
            />
          )}
        </div>
      </div>
    </>
  )
}

const mapDataToProps = ({
  Projects: { allErc20Projects, allProjects, loading },
  ownProps
}) => {
  const { data = {} } = ownProps
  return {
    ...ownProps,
    data: {
      allErc20Projects: allErc20Projects || data.allErc20Projects,
      allProjects: allProjects || data.allProjects
    },
    isLoading: loading
  }
}

const enhance = compose(
  graphql(allProjectsForSearchGQL, {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(ALL_ERC20_PROJECTS_QUERY, {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(ASSETS_BY_WALLET_QUERY, {
    name: 'assetsByWallet',
    props: mapAssetsHeldByAddressToProps,
    skip: ({ byAddress }) => !byAddress,
    options: ({ byAddress }) => {
      return {
        variables: {
          address: byAddress
        },
        errorPolicy: 'all'
      }
    }
  })
)

TriggerFormHistoricalBalance.propTypes = propTypes

export default enhance(TriggerFormHistoricalBalance)
