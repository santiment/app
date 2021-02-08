import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import {
  METRIC_TARGET_OPTIONS,
  METRIC_KEYS_WITH_TEXT_SELECTOR,
  METRIC_TARGET_TEXT
} from '../../../utils/constants'
import { getRecentTrends } from '../../../../../utils/recent'
import GetProjects from '../../../common/projects/getProjects'
import { isAsset, isWatchlist, isText } from '../../../utils/utils'
import TriggerFormWatchlists from './TriggerFormWatchlists'
import { TriggerProjectsSelector } from './projectsSelector/TriggerProjectsSelector'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any
}

const TriggerFormAssetWallet = ({
  metaFormSettings: { target: defaultAsset, signalType: defaultSignalType },
  setFieldValue,
  values,
  metric
}) => {
  const { signalType, target } = values
  const [trendsOptions] = useState(
    getRecentTrends().map(text => ({ label: text, value: text }))
  )

  const defaultSelected = signalType
    ? signalType.value
    : defaultSignalType.value.value

  const options = METRIC_KEYS_WITH_TEXT_SELECTOR.includes(metric.key)
    ? METRIC_TARGET_OPTIONS
    : METRIC_TARGET_OPTIONS.filter(option => option !== METRIC_TARGET_TEXT)

  return (
    <>
      <div className={cx(styles.row, styles.rowTop)}>
        <Selector
          className={styles.selector}
          options={options.map(({ value }) => value)}
          nameOptions={options.map(({ label }) => label)}
          defaultSelected={defaultSelected}
          onSelectOption={selectedValue => {
            const type = options.find(({ value }) => value === selectedValue)

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
          {isAsset(signalType) && (
            <GetProjects
              render={({ allProjects, isLoading }) => {
                return (
                  <TriggerProjectsSelector
                    isLoading={isLoading}
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
          {isText(signalType) && (
            <FormikSelect
              multi={false}
              isCreatable={true}
              name='textSelector'
              placeholder='Enter a word or a phrase...'
              options={trendsOptions}
            />
          )}
        </div>
      </div>
    </>
  )
}

TriggerFormAssetWallet.propTypes = propTypes

export default TriggerFormAssetWallet
