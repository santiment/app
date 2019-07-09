import React from 'react'
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
  mapToAssets
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
    !allErc20Projects.find(x => x.value === target.value)
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

  const canUseMappedErc20 = !!byAddress && assets.length > 0

  const disabledWalletField = isDisabledWalletAddressField(
    canUseMappedErc20,
    target,
    allErc20Projects
  )

  const selectableProjects = canUseMappedErc20 ? assets : allProjects

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
          heldByWallet={assets}
          setFieldValue={setFieldValue}
          target={target}
          projects={selectableProjects}
          onChange={newAsset => {
            if (
              isDisabledWalletAddressField(
                canUseMappedErc20,
                newAsset,
                allErc20Projects
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
  return {
    ...ownProps,
    data: {
      allErc20Projects: mapToAssets(allErc20Projects) || data.allErc20Projects,
      allProjects: mapToAssets(allProjects, false) || data.allProjects
    }
  }
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
