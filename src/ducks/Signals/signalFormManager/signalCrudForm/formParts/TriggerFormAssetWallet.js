import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import { METRIC_TARGET_OPTIONS } from '../../../utils/constants'
import GetProjects from '../../../common/projects/getProjects'
import { isAsset, isWatchlist, mapToAssets } from '../../../utils/utils'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  metaFormSettings: { target: defaultAsset, signalType: defaultSignalType },
  setFieldValue,
  values: { signalType, target }
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <Label accent='waterloo' className={styles.label}>
          Type
        </Label>
        <FormikSelect
          name='signalType'
          isClearable={false}
          disabled={defaultSignalType.isDisabled}
          defaultValue={defaultSignalType.value.value}
          placeholder={'Pick signal type'}
          options={METRIC_TARGET_OPTIONS}
          onChange={type => {
            if (isAsset(type)) {
              setFieldValue('target', defaultAsset.value)
            } else if (isWatchlist(type)) {
              setFieldValue('target', '')
            }
          }}
        />
      </div>

      {isAsset(signalType) && !Array.isArray(target) && (
        <div className={styles.Field}>
          <Label className={styles.label}>&nbsp;</Label>
          <GetProjects
            render={({ isLoading, allProjects }) => {
              return (
                <FormikSelect
                  isLoading={isLoading}
                  name='target'
                  placeholder='Pick an asset'
                  required
                  options={mapToAssets(allProjects, false)}
                />
              )
            }}
          />
        </div>
      )}

      {isWatchlist(signalType) && <TriggerFormWatchlists />}
    </div>
  )
}

TriggerFormAssetWallet.propTypes = propTypes

export default TriggerFormAssetWallet
