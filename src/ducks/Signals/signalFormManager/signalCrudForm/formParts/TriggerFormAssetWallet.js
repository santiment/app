import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import {
  DAILY_ACTIVE_ADDRESSES,
  METRIC_TARGET_OPTIONS
} from '../../../utils/constants'
import GetProjects from '../../../common/projects/getProjects'
import { isAsset, isWatchlist } from '../../../utils/utils'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import { TriggerProjectsSelector } from './ProjectsSelector/TriggerProjectsSelector'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  metaFormSettings: { target: defaultAsset, signalType: defaultSignalType },
  setFieldValue,
  values
}) => {
  const { signalType, metric } = values
  const isAssets = isAsset(signalType)
  const isDAA = metric.value === DAILY_ACTIVE_ADDRESSES

  return (
    <>
      <div className={styles.row}>
        <div className={cx(styles.Field, isAssets && styles.fieldFilled)}>
          <FormikLabel text='Type' />
          <FormikSelect
            name='signalType'
            isClearable={false}
            disabled={isDAA || defaultSignalType.isDisabled}
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
        {isWatchlist(signalType) && <TriggerFormWatchlists />}
      </div>
      <div className={cx(styles.row, styles.rowTop)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <GetProjects
            render={({ isLoading, allProjects }) => {
              return (
                <TriggerProjectsSelector
                  name='target'
                  values={values}
                  projects={allProjects}
                  setFieldValue={setFieldValue}
                />
              )
            }}
          />
        </div>
      </div>
    </>
  )
}

TriggerFormAssetWallet.propTypes = propTypes

export default TriggerFormAssetWallet
