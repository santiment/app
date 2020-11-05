import React, { useEffect, useCallback, useMemo } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import { WALLET_ASSETS_QUERY } from '../../../../HistoricalBalance/hooks'
import {
  isPossibleEthAddress,
  mapAssetsHeldByAddressToProps,
  hasEthAddress
} from '../../../utils/utils'
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import { NOT_VALID_HB_ADDRESS } from '../../../utils/constants'
import { useProjects } from '../../../../Studio/Compare/withProjects'
import styles from '../signal/TriggerForm.module.scss'

const isInAssetsList = (heldAssets, target) => {
  if (!heldAssets) {
    return false
  }

  let checking = Array.isArray(target) ? target : [target]

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
  isInAssetsList(allErc20Projects, target)

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

const getFromAll = (all, { value, slug }) =>
  all.find(
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
  heldAssets,
  metaFormSettings: { ethAddress: metaEthAddress, target: metaTarget },
  setFieldValue,
  values: { target, ethAddress },
  isNewSignal
}) => {
  const [allProjects, loading] = useProjects()

  const metaMappedToAll = useMemo(
    () => {
      return allProjects.length
        ? mapAssetsToAllProjects(
          allProjects,
          Array.isArray(metaTarget.value)
            ? metaTarget.value
            : [metaTarget.value]
        )
        : []
    },
    [allProjects, metaTarget]
  )

  const setTarget = useCallback(
    newTarget => {
      if (newTarget !== target) {
        setFieldValue('target', newTarget)
      }
    },
    [setFieldValue, target]
  )

  const validateTarget = useCallback(
    newTarget => {
      let asset

      if (newTarget) {
        if (Array.isArray(newTarget)) {
          if (newTarget.length > 0) {
            asset = getFromAll(allProjects, newTarget[0])
          }
        } else {
          asset = getFromAll(allProjects, newTarget)
        }
      }

      if (asset) {
        setTarget(asset)
      }
    },
    [allProjects, setFieldValue, ethAddress]
  )

  const setAddress = useCallback(
    address => {
      setFieldValue('ethAddress', address)
    },
    [setFieldValue]
  )

  const disabledWalletField =
    (!hasEthAddress(ethAddress) && target.length > 1) ||
    (allProjects.length > 0 && !isErc20Assets(target, allProjects))

  const validateAddressField = useCallback(
    inputAssets => {
      if (allProjects.length && !isErc20Assets(inputAssets, allProjects)) {
        setAddress('')
        return
      }

      if (inputAssets.length > 1) {
        setAddress('')
        return
      }

      if (metaEthAddress && !hasEthAddress(ethAddress)) {
        if (inputAssets.length === 1) {
          if (
            isInAssetsList(metaMappedToAll, inputAssets) ||
            isInAssetsList(heldAssets, inputAssets)
          ) {
            setAddress(metaEthAddress)
          } else {
            setAddress('')
          }
        }
      } else if (disabledWalletField) {
        setAddress('')
      }
    },
    [
      setAddress,
      allProjects,
      setAddress,
      disabledWalletField,
      metaEthAddress,
      ethAddress
    ]
  )

  useEffect(
    () => {
      if (heldAssets && heldAssets.length > 0) {
        if (!isInAssetsList(heldAssets, target) && isNewSignal) {
          validateTarget(heldAssets[0])
        }
      }
    },
    [heldAssets]
  )

  useEffect(
    () => {
      validateTarget(target)
    },
    [target, ethAddress, allProjects]
  )

  useEffect(
    () => {
      const showError =
        allProjects &&
        allProjects.length > 0 &&
        isErc20Assets(target, allProjects)

      setFieldValue(
        'isHbAddressError',
        showError ? !hasEthAddress(ethAddress) : false
      )
    },
    [target, ethAddress, allProjects.length]
  )

  useEffect(
    () => {
      validateAddressField(target)
    },
    [target]
  )

  useEffect(
    () => {
      setFieldValue('isLoading', loading)
    },
    [loading]
  )

  useEffect(
    () => {
      if (!hasEthAddress(ethAddress)) {
        if (!Array.isArray(target)) {
          setTarget([target])
        }
      }
    },
    [ethAddress]
  )

  const selectableProjects = useMemo(
    () => {
      return hasEthAddress(ethAddress) &&
        !disabledWalletField &&
        heldAssets &&
        heldAssets.length > 0
        ? mapAssetsToAllProjects(allProjects, heldAssets)
        : allProjects
    },
    [hasEthAddress, disabledWalletField, heldAssets, allProjects]
  )

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
            notificationText={NOT_VALID_HB_ADDRESS}
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
            isLoading={loading}
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

const enhance = graphql(WALLET_ASSETS_QUERY, {
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

TriggerFormHistoricalBalance.propTypes = propTypes

export default enhance(TriggerFormHistoricalBalance)
