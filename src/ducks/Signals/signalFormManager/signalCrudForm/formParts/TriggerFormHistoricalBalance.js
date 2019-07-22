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
import styles from '../signal/TriggerForm.module.scss'
import { TriggerProjectsSelector } from './ProjectsSelector/TriggerProjectsSelector'

const isInHeldAssets = (heldAssets, checking) => {
  debugger
  for (let i = 0; i < heldAssets.length; i++) {
    const heldAsset = heldAssets[i]

    if (!checking.some(({ slug }) => slug === heldAsset.slug)) {
      return false
    }
  }
  return true
}

const isNotErc20Assets = (target, allErc20Projects) => {
  const isEthOrErc20 =
    target.value === 'ethereum' ||
    (Array.isArray(target) && isInHeldAssets(allErc20Projects, target)) ||
    allErc20Projects.some(x => x.value === target.value)

  return !isEthOrErc20
}

const mapAssetsToAllProjects = (all, heldAssets) => {
  let items = []
  for (let i = 0; i < heldAssets.length; i++) {
    const item = heldAssets[i]
    const foundInAll = all.find(({ slug }) => slug === item.slug)
    if (foundInAll) {
      items.push(foundInAll)
    }
  }

  return items
}

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
  metaFormSettings,
  assets = [],
  setFieldValue,
  byAddress = '',
  values
}) => {
  const { target } = values

  console.log(byAddress)

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

  const disabledWalletField =
    !target ||
    (target && target.length > 1) ||
    // || (!!byAddress && heldAssets.length > 0)
    isNotErc20Assets(target, erc20List)

  const selectableProjects = !disabledWalletField
    ? mapAssetsToAllProjects(allList, heldAssets)
    : allList

  const { ethAddress, target: metaTarget } = metaFormSettings

  const isDefaultAssets = assets =>
    assets && assets.some(({ slug }) => metaTarget.value.value === slug)

  const setAddress = address => setFieldValue('ethAddress', address)

  const isMulti = target && !ethAddress

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
                if (disabledWalletField) {
                  debugger
                  setAddress('')
                } else if (ethAddress) {
                  debugger
                  if (
                    isDefaultAssets(assets) ||
                    isInHeldAssets(heldAssets, assets)
                  ) {
                    setAddress(ethAddress)
                  } else {
                    setAddress('')
                  }
                }
              }}
            />
          )}
        </div>
      </div>
    </Fragment>
  )
}

const mapDataToProps = ({
  Projects: { allErc20Projects, allProjects },
  ownProps
}) => {
  const { data = {} } = ownProps
  return {
    ...ownProps,
    data: {
      allErc20Projects: allErc20Projects || data.allErc20Projects,
      allProjects: allProjects || data.allProjects
    }
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
