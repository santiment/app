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

const isDisabledWalletAddressField = (target, allErc20Projects) => {
  return (
    !target ||
    !target.value ||
    !allErc20Projects.find(x => x.slug === target.value)
  )
}

const propTypes = {
  metaFormSettings: PropTypes.any,
  metric: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired
}

const TriggerFormAssetWallet = ({
  data: { allErc20Projects = [], allProjects = [] } = {},
  target,
  metaFormSettings,
  metric,
  setFieldValue
}) => {
  const defaultSignalType = metaFormSettings.signalType
  const isEthWallet = metric.value === ETH_WALLET_METRIC.value

  const disabledWalletField = isDisabledWalletAddressField(
    target,
    allErc20Projects
  )

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
          setFieldValue={setFieldValue}
          target={target}
          projects={allProjects}
          onChange={newAsset => {
            if (isDisabledWalletAddressField(newAsset, allErc20Projects)) {
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
      allErc20Projects: allErc20Projects || data.allErc20Projects || [],
      allProjects: allProjects || data.allProjects || []
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
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(pickGQL('erc20'), {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  })
)

TriggerFormAssetWallet.propTypes = propTypes

export default enhance(TriggerFormAssetWallet)
