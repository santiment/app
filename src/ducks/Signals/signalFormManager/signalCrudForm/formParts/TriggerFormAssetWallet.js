import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import { ASSETS_FILTERS, ETH_WALLET_METRIC } from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any,
  metric: PropTypes.any.isRequired,
  allProjects: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired
}

export const TriggerFormAssetWallet = ({
  metaFormSettings,
  metric,
  allProjects,
  setFieldValue
}) => {
  const defaultSignalType = metaFormSettings.signalType
  const defaultAsset = metaFormSettings.target

  const { address } = metaFormSettings

  const isEthWallet = metric.value === ETH_WALLET_METRIC.value

  return (
    <div>
      {!isEthWallet && (
        <div className={styles.row}>
          <div className={styles.Field}>
            <label>Type</label>
            <FormikSelect
              name='signalType'
              isDisabled={defaultSignalType.isDisabled}
              defaultValue={defaultSignalType.value.value}
              placeholder='Pick signal type'
              options={ASSETS_FILTERS}
            />
          </div>
          <div className={styles.Field}>
            <FormikSelect
              name='target'
              isDisabled={defaultAsset.isDisabled}
              defaultValue={defaultAsset.value.value}
              placeholder='Pick an asset'
              options={allProjects.map(asset => ({
                label: asset.slug,
                value: asset.slug
              }))}
            />
          </div>
        </div>
      )}
      {isEthWallet && (
        <div className={styles.row}>
          <div className={styles.Field}>
            <label>Wallet</label>
            <FormikInput name='address' placeholder='Wallet address' />
          </div>
          <div className={styles.Field}>
            <label>Asset</label>
            <FormikSelect
              name='target'
              defaultValue={defaultAsset.value.value}
              placeholder='Pick an asset'
              options={allProjects.map(asset => ({
                label: asset.slug,
                value: asset.slug
              }))}
              onChange={newAsset => {
                if (metaFormSettings.target.value.value === newAsset.value) {
                  setFieldValue('address', address)
                } else {
                  setFieldValue('address', '')
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

TriggerFormAssetWallet.propTypes = propTypes
