import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import Label from '@santiment-network/ui/Label'
import { ASSETS_FILTERS, ETH_WALLET_METRIC } from '../../../utils/constants'
import { ProjectsByErc20, ProjectsAll } from './TriggerProjectsSelector'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any,
  metric: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired
}

export const TriggerFormAssetWallet = ({
  target,
  metaFormSettings,
  metric,
  setFieldValue
}) => {
  const defaultSignalType = metaFormSettings.signalType
  const isEthWallet = metric.value === ETH_WALLET_METRIC.value

  const ProjectsViewComponent = isEthWallet ? ProjectsByErc20 : ProjectsAll

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
        <ProjectsViewComponent
          metaFormSettings={metaFormSettings}
          setFieldValue={setFieldValue}
          target={target}
        />
      </div>
    </div>
  )
}

TriggerFormAssetWallet.propTypes = propTypes
