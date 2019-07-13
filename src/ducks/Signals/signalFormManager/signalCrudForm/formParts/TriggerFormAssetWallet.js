import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import Label from '@santiment-network/ui/Label'
import {
  METRIC_TARGET_OPTIONS,
  METRIC_TARGET_ASSETS,
  METRIC_TARGET_WATCHLIST
} from '../../../utils/constants'
import GetWatchlists from '../../../../Watchlists/GetWatchlists'
import GetProjects from '../../../common/projects/getProjects'
import { mapToAssets } from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  metaFormSettings,
  values: { signalType }
}) => {
  const defaultSignalType = metaFormSettings.signalType

  const { target: defaultAsset } = metaFormSettings

  const isAsset = signalType.value === METRIC_TARGET_ASSETS.value
  const isWatchlist = signalType.value === METRIC_TARGET_WATCHLIST.value

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <Label accent='waterloo' className={styles.label}>
          Type
        </Label>
        <FormikSelect
          name='signalType'
          disabled={defaultSignalType.isDisabled}
          defaultValue={defaultSignalType.value.value}
          placeholder={'Pick signal type'}
          options={METRIC_TARGET_OPTIONS}
        />
      </div>

      {isAsset && (
        <div className={styles.Field}>
          <Label className={styles.label}>&nbsp;</Label>
          <GetProjects
            render={({ isLoading, allProjects }) => {
              return (
                <FormikSelect
                  isLoading={isLoading}
                  name='target'
                  disabled={defaultAsset.isDisabled}
                  defaultValue={defaultAsset.value.value}
                  placeholder='Pick an asset'
                  required
                  options={mapToAssets(allProjects, false)}
                />
              )
            }}
          />
        </div>
      )}

      {isWatchlist && (
        <div className={styles.Field}>
          <Label className={styles.label}>&nbsp;</Label>
          <GetWatchlists
            render={({ isWatchlistsLoading, watchlists }) => {
              return (
                <FormikSelect
                  isLoading={isWatchlistsLoading}
                  name='target'
                  placeholder='Pick an watchlist'
                  required
                  valueKey='id'
                  labelKey='name'
                  options={watchlists}
                />
              )
            }}
          />
        </div>
      )}
    </div>
  )
}

TriggerFormAssetWallet.propTypes = propTypes

export default TriggerFormAssetWallet
