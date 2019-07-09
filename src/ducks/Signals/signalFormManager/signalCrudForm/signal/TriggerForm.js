import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'recompose'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import { selectIsTelegramConnected } from '../../../../../pages/UserSelectors'
import {
  fetchHistorySignalPoints,
  removeTrigger
} from '../../../common/actions'
import FormikCheckboxes from '../../../../../components/formik-santiment-ui/FormikCheckboxes'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import Button from '@santiment-network/ui/Button'
import { Checkbox } from '@santiment-network/ui'
import Message from '@santiment-network/ui/Message'
import {
  PRICE_PERCENT_CHANGE,
  METRIC_DEFAULT_VALUES,
  DEFAULT_FORM_META_SETTINGS,
  METRIC_TO_TYPES,
  TRENDING_WORDS
} from '../../../utils/constants'
import {
  couldShowChart,
  mapFormPropsToTrigger,
  validateTriggerForm
} from '../../../utils/utils'
import { TriggerFormMetricValues } from '../formParts/TriggerFormMetricValues'
import { TriggerFormMetricTypes } from '../formParts/TriggerFormMetricTypes'
import { TriggerFormFrequency } from '../formParts/TriggerFormFrequency'
import SignalPreview from '../../../chart/SignalPreview'
import Label from '@santiment-network/ui/Label'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import TriggerMetricTypesResolver from '../formParts/TriggerMetricTypesResolver'
import styles from './TriggerForm.module.scss'

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  isTelegramConnected: PropTypes.bool.isRequired,
  lastPriceItem: PropTypes.any,
  canRedirect: PropTypes.bool,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any
}

export const TriggerForm = ({
  onSettingsChange,
  getSignalBacktestingPoints,
  isTelegramConnected = false,
  lastPriceItem,
  settings,
  metaFormSettings,
  trigger,
  removeSignal,
  onRemovedSignal
}) => {
  const formMetric =
    metaFormSettings && metaFormSettings.metric
      ? metaFormSettings.metric.value.value
      : PRICE_PERCENT_CHANGE

  metaFormSettings = { ...DEFAULT_FORM_META_SETTINGS, ...metaFormSettings }
  settings = {
    ...METRIC_DEFAULT_VALUES[formMetric],
    target: metaFormSettings.target.value
      ? metaFormSettings.target.value
      : settings.target,
    metric: metaFormSettings.metric.value
      ? metaFormSettings.metric.value
      : settings.metric,
    type: metaFormSettings.type.value
      ? metaFormSettings.type.value
      : settings.type,
    signalType: metaFormSettings.signalType.value
      ? metaFormSettings.signalType.value
      : settings.signalType,
    ethAddress: metaFormSettings.ethAddress,
    ...settings
  }

  const [initialValues, setInitialValues] = useState(settings)

  useEffect(() => {
    couldShowChart(initialValues.metric) &&
      getSignalBacktestingPoints(initialValues)
  }, [])

  const defaultType = metaFormSettings.type

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid
      enableReinitialize
      validate={validateTriggerForm}
      onSubmit={values => {
        onSettingsChange(values)
      }}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid,
        validateForm
      }) => {
        const {
          metric,
          type,
          target,
          frequencyType,
          frequencyTimeType,
          isRepeating,
          ethAddress
        } = values
        const typeSelectors = METRIC_TO_TYPES[(metric || {}).value]

        const { price } = lastPriceItem || {}

        const showChart = couldShowChart(metric)
        const isTrendingWords = metric.value === TRENDING_WORDS

        return (
          <Form className={styles.TriggerForm}>
            <FormikEffect
              onChange={(current, prev) => {
                let { values: newValues } = current
                if (
                  !prev.values.metric ||
                  newValues.metric.value !== prev.values.metric.value ||
                  newValues.type.value !== prev.values.type.value
                ) {
                  const defaultValues =
                    METRIC_DEFAULT_VALUES[newValues.type.metric] || {}
                  newValues = {
                    ...defaultValues,
                    ...newValues
                  }
                  setInitialValues(newValues)
                  validateForm()
                }

                if (!isEqual(newValues, prev.values)) {
                  const lastErrors = validateTriggerForm(newValues)
                  const isError = Object.keys(newValues).some(
                    key => lastErrors[key]
                  )

                  const canLoadChart =
                    newValues && couldShowChart(newValues.metric)

                  newValues.target &&
                    !isError &&
                    canLoadChart &&
                    getSignalBacktestingPoints(newValues)
                }
              }}
            />

            <div className={styles.triggerFormItem}>
              <TriggerFormMetricTypes
                metaFormSettings={metaFormSettings}
                setFieldValue={setFieldValue}
                metric={metric}
              />

              <TriggerMetricTypesResolver
                isTrendingWords={isTrendingWords}
                address={ethAddress}
                metric={metric}
                target={target}
                metaFormSettings={metaFormSettings}
                setFieldValue={setFieldValue}
              />

              {!metric.hidden && typeSelectors && typeSelectors.length > 1 && (
                <div className={cx(styles.row)}>
                  <div className={cx(styles.Field, styles.fieldFilled)}>
                    <Label accent='waterloo' className={styles.label}>
                      Condition
                    </Label>
                    <FormikSelect
                      name='type'
                      isClearable={false}
                      isSearchable
                      isDisabled={defaultType.isDisabled}
                      defaultValue={defaultType.value}
                      placeholder='Choose a type'
                      options={typeSelectors}
                      isOptionDisabled={option => !option.value}
                    />
                  </div>
                </div>
              )}

              <TriggerFormMetricValues lastPrice={price} values={values} />

              {!isTrendingWords && (
                <TriggerFormFrequency
                  metaFormSettings={metaFormSettings}
                  setFieldValue={setFieldValue}
                  frequencyType={frequencyType}
                  metric={type.metric}
                  frequencyTimeType={frequencyTimeType}
                />
              )}

              {showChart && (
                <div className={cx(styles.row, styles.signalPreview)}>
                  <SignalPreview target={target.value} type={type.metric} />
                </div>
              )}

              <div className={cx(styles.row, styles.isRepeatingRow)}>
                <div className={styles.isRepeating}>
                  <Checkbox
                    isActive={isRepeating}
                    name='isRepeating'
                    className={styles.repeatingItem}
                    onClick={() => {
                      setFieldValue('isRepeating', !isRepeating)
                    }}
                  />
                  <span
                    className={styles.repeatingItem}
                    onClick={() => {
                      setFieldValue('isRepeating', !isRepeating)
                    }}
                  >
                    {isRepeating ? 'Task never ends' : 'Task fires only once'}
                  </span>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.Field}>
                  <Label accent='waterloo' className={styles.label}>
                    Notify me via
                  </Label>
                  <div className={styles.notifyBlock}>
                    <FormikCheckboxes
                      name='channels'
                      labelOnRight
                      disabledIndexes={['Email']}
                      options={['Email', 'Telegram']}
                    />
                    {!isTelegramConnected && (
                      <Button
                        className={styles.connectLink}
                        variant='ghost'
                        as={Link}
                        to='/account'
                      >
                        <span className={styles.connectLink}>Connect</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {errors.channels && (
                <div className={cx(styles.row, styles.messages)}>
                  <Message variant='warn'>{errors.channels}</Message>
                </div>
              )}
            </div>

            <div className={styles.controls}>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                isActive={isValid && !isSubmitting}
                variant={'fill'}
                accent='positive'
              >
                Continue
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

TriggerForm.propTypes = propTypes

const mapStateToProps = state => {
  return {
    isTelegramConnected: selectIsTelegramConnected(state),
    lastPriceItem: state.signals.points
      ? state.signals.points[state.signals.points.length - 1]
      : undefined
  }
}

const mapDispatchToProps = dispatch => ({
  getSignalBacktestingPoints: payload => {
    dispatch(fetchHistorySignalPoints(mapFormPropsToTrigger(payload)))
  },
  removeSignal: id => {
    dispatch(removeTrigger(id))
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(TriggerForm)
