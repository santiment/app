import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import Label from '@santiment-network/ui/Label'
import { ASSETS_FILTERS, ETH_WALLET_METRIC } from '../../../utils/constants'
import { TriggerProjectsSelector } from './TriggerProjectsSelector'
import {
  ALL_ERC20_PROJECTS_QUERY,
  allProjectsForSearchGQL
} from '../../../../../pages/Projects/allProjectsGQL'
import styles from '../signal/TriggerForm.module.scss'
import { ASSETS_BY_WALLET_QUERY } from '../../../../HistoricalBalance/common/queries'
import {
  mapAssetsHeldByAddressToProps,
  mapToAssets,
  isPossibleEthAddress
} from '../../../utils/utils'

const isDisabledWalletAddressField = (
  canUseMappedErc20,
  target,
  allErc20Projects
) => {
  if (canUseMappedErc20) {
    return false
  }

  return (
    !target ||
    !target.value ||
    !(
      target.value === 'ethereum' ||
      allErc20Projects.find(x => x.value === target.value)
    )
  )
}

const propTypes = {
  metaFormSettings: PropTypes.any,
  metric: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  byAddress: PropTypes.string,
  assets: PropTypes.array
}

const TriggerFormAssetWallet = ({
  data: { allErc20Projects = [], allProjects = [] } = {},
  target,
  metaFormSettings,
  metric,
  assets = [],
  setFieldValue,
  byAddress = ''
}) => {
  const defaultSignalType = metaFormSettings.signalType
  const isEthWallet = metric.value === ETH_WALLET_METRIC.value

  const [erc20List, setErc20] = useState(allErc20Projects)
  const [allList, setAll] = useState(allProjects)
  const [heldAssets, setHeldAssets] = useState(assets)

  useEffect(() => {
    allErc20Projects.length && setErc20(allErc20Projects)
    allProjects.length && setAll(allProjects)
    assets.length && setHeldAssets(assets)
  })

  const canUseMappedErc20 = !!byAddress && assets.length > 0
  const disabledWalletField = isDisabledWalletAddressField(
    canUseMappedErc20,
    target,
    erc20List
  )
  const selectableProjects = canUseMappedErc20 ? assets : allList

  console.log(byAddress)
  console.log(isPossibleEthAddress(byAddress))

  return (
    <div className={styles.row}>
      {!isEthWallet && (
        <div className={styles.Field}>
          <Label accent='waterloo' className={styles.label}>
            Type
          </Label>
          <FormikSelect
            name='signalType'
            isDisabled={defaultSignalType.isDisabled}
            defaultValue={defaultSignalType.value.value}
            placeholder={'Pick signal type'}
            options={ASSETS_FILTERS}
          />
        </div>
      )}
      {isEthWallet && (
        <div className={styles.Field}>
          <Label accent='waterloo' className={styles.label}>
            Wallet
          </Label>
          <FormikInput
            disabled={disabledWalletField}
            validator={isPossibleEthAddress}
            name='ethAddress'
            placeholder={
              disabledWalletField ? 'Only for ETH and ERC20' : 'Wallet address'
            }
          />
        </div>
      )}

      <div className={styles.Field}>
        <Label className={styles.label}>&nbsp;</Label>
        <TriggerProjectsSelector
          metaFormSettings={metaFormSettings}
          heldByWallet={heldAssets}
          setFieldValue={setFieldValue}
          target={target}
          projects={selectableProjects}
          onChange={newAsset => {
            if (
              isDisabledWalletAddressField(
                canUseMappedErc20,
                newAsset,
                erc20List
              )
            ) {
              setFieldValue('ethAddress', '')
            }
          }}
        />
      </div>
    </div>
  )
}

const mapDataToProps = ({
  Projects: { allErc20Projects, allProjects },
  ownProps
}) => {
  const { data = {} } = ownProps

  if (allProjects) {
    return {
      ...ownProps,
      data: {
        allProjects: mapToAssets(allProjects, false) || data.allProjects
      }
    }
  }

  if (allErc20Projects) {
    return {
      ...ownProps,
      data: {
        allErc20Projects: mapToAssets(allErc20Projects) || data.allErc20Projects
      }
    }
  }

  return ownProps
}

const pickGQL = type => {
  switch (type) {
    case 'erc20':
      return ALL_ERC20_PROJECTS_QUERY
    default:
      return allProjectsForSearchGQL
  }
}

const enhance = compose(
  graphql(pickGQL('all'), {
    name: 'Projects',
    props: mapDataToProps,
    skip: ({ byAddress }) => !!byAddress,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(pickGQL('erc20'), {
    name: 'Projects',
    props: mapDataToProps,
    skip: ({ byAddress }) => !byAddress,
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

TriggerFormAssetWallet.propTypes = propTypes

export default enhance(TriggerFormAssetWallet)
