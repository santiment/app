import React, { useState, useEffect, Fragment } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import cx from 'classnames'
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

const isNotErc20Assets = (target, allErc20Projects) => {
  const isEthOrErc20 =
    target.value === 'ethereum' ||
    (Array.isArray(target) && isInHeldAssets(allErc20Projects, target)) ||
    allErc20Projects.some(({ slug }) => slug === target.slug)

  return !isEthOrErc20
}

const mapAssetsToAllProjects = (all, heldAssets) =>
  heldAssets.reduce((acc, item) => {
    const foundInAll = all.find(({ slug }) => slug === item.slug)
    if (foundInAll) {
      acc.push(foundInAll)
    }
    return acc
  }, [])

const isDefaultAssets = (metaTarget, assets) =>
  assets && assets.some(({ slug }) => metaTarget.value.value === slug)

const propTypes = {
  metaFormSettings: PropTypes.any,
  values: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  byAddress: PropTypes.string,
  assets: PropTypes.array
}

const TriggerFormHistoricalBalance = ({
  data: { allErc20Projects = [], allProjects = [] } = {},
  metaFormSettings: { ethAddress: metaEthAddress, target: metaTarget },
  assets = [],
  setFieldValue,
  byAddress = '',
  values,
  isLoading = false
}) => {
  const { target, ethAddress } = values

  const isMulti = target && Array.isArray(target)

  const [erc20List, setErc20] = useState(allErc20Projects)
  const [allList, setAll] = useState(allProjects)
  const [heldAssets, setHeldAssets] = useState(assets)

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
      if (!isMulti && target.length === 1) {
        setFieldValue('target', target[0])
      }
    },
    [target]
  )

  useEffect(
    () => {
      let foundBaseAsset
      if (!isMulti && target.length > 0) {
        const [first] = target
        foundBaseAsset = allList.find(
          ({ slug }) => slug === first.slug || slug === first.value
        )
      } else if (target && target.value) {
        foundBaseAsset = allList.find(({ slug }) => slug === target.value)
      }

      if (foundBaseAsset) {
        setFieldValue('target', foundBaseAsset)
      }
    },
    [ethAddress]
  )

  const disabledWalletField = !target || (target && target.length > 1)
  isNotErc20Assets(target, erc20List)

  const selectableProjects =
    ethAddress && !disabledWalletField
      ? mapAssetsToAllProjects(allList, heldAssets)
      : allList

  const setAddress = address => setFieldValue('ethAddress', address)

  const validateAddressField = assets => {
    if (metaEthAddress) {
      if (
        assets.length === 1 &&
        (isDefaultAssets(metaTarget, assets) ||
          isInHeldAssets(heldAssets, assets))
      ) {
        setAddress(metaEthAddress)
      } else {
        setAddress('')
      }
    } else if (disabledWalletField) {
      setAddress('')
    }
  }

  return (
    <Fragment>
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
              onChange={assets => {
                validateAddressField(assets)
              }}
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
              onChange={newAsset => {
                validateAddressField([newAsset])
              }}
            />
          )}
        </div>
      </div>
    </Fragment>
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
