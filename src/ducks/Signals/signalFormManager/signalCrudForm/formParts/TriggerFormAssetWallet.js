import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import { ASSETS_FILTERS, ETH_WALLET_METRIC } from '../../../utils/constants'
import Label from '@santiment-network/ui/Label'
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

  const { ethAddress } = metaFormSettings

  const isEthWallet = metric.value === ETH_WALLET_METRIC.value

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
            placeholder='Pick signal type'
            options={ASSETS_FILTERS}
          />
        </div>
      )}
      {isEthWallet && (
        <div className={styles.Field}>
          <Label accent='waterloo' className={styles.label}>
            Wallet
          </Label>
          <FormikInput name='ethAddress' placeholder='Wallet address' />
        </div>
      )}

      <div className={styles.Field}>
        <Label className={styles.label}>&nbsp;</Label>
        <FormikSelect
          name='target'
          isDisabled={defaultAsset.isDisabled}
          defaultValue={defaultAsset.value.value}
          placeholder='Pick an asset'
          options={allProjects.map(asset => ({
            label: asset.slug,
            value: asset.slug
          }))}
          onChange={newAsset => {
            if (ethAddress) {
              if (metaFormSettings.target.value.value === newAsset.value) {
                setFieldValue('ethAddress', ethAddress)
              } else {
                setFieldValue('ethAddress', '')
              }
            }
          }}
        />
      </div>
    </div>
  )
}

TriggerFormAssetWallet.propTypes = propTypes
