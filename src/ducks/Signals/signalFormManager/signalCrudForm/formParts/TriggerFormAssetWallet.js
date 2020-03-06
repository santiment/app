import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { METRIC_TARGET_OPTIONS } from '../../../utils/constants'
import GetProjects from '../../../common/projects/getProjects'
import { isAsset, isWatchlist } from '../../../utils/utils'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector'
import Selector from '@santiment-network/ui/Selector/Selector'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  metaFormSettings: { target: defaultAsset, signalType: defaultSignalType },
  setFieldValue,
  values
}) => {
  const { signalType, target } = values
  const isAssets = isAsset(signalType)

  const defaultSelected = signalType
    ? signalType.value
    : defaultSignalType.value.value

  return (
    <Fragment>
      <div className={cx(styles.row, styles.rowTop)}>
        <Selector
          className={styles.selector}
          options={METRIC_TARGET_OPTIONS.map(({ value }) => value)}
          nameOptions={METRIC_TARGET_OPTIONS.map(({ label }) => label)}
          defaultSelected={defaultSelected}
          onSelectOption={selectedValue => {
            const type = METRIC_TARGET_OPTIONS.find(
              ({ value }) => value === selectedValue
            )

            setFieldValue('signalType', type)
            if (isAsset(type)) {
              setFieldValue('target', target || defaultAsset.value)
            }
          }}
          variant='border'
        />
      </div>
      <div className={cx(styles.row, styles.rowTop)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          {isAssets && (
            <GetProjects
              render={({ allProjects }) => {
                return (
                  <TriggerProjectsSelector
                    name='target'
                    target={target}
                    projects={allProjects}
                    setFieldValue={setFieldValue}
                  />
                )
              }}
            />
          )}
          {isWatchlist(signalType) && (
            <TriggerFormWatchlists
              values={values}
              setFieldValue={setFieldValue}
            />
          )}
        </div>
      </div>
    </Fragment>
  )
}

TriggerFormAssetWallet.propTypes = propTypes

export default TriggerFormAssetWallet
