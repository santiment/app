import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import { METRIC_TARGET_OPTIONS } from '../../../utils/constants'
import GetProjects from '../../../common/projects/getProjects'
import { isAsset, isWatchlist } from '../../../utils/utils'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  metaFormSettings: { target: defaultAsset, signalType: defaultSignalType },
  setFieldValue,
  values
}) => {
  const { signalType } = values
  const isAssets = isAsset(signalType)

  return (
    <Fragment>
      <div className={cx(styles.row, styles.rowTop)}>
        <div className={cx(styles.Field, isAssets && styles.fieldFilled)}>
          <FormikLabel text='Type' />
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
        {isWatchlist(signalType) && <TriggerFormWatchlists />}
      </div>
      {isAssets && (
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
      )}
    </Fragment>
  )
}

TriggerFormAssetWallet.propTypes = propTypes

export default TriggerFormAssetWallet
