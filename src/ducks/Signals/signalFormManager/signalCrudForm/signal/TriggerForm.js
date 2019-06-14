import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { Button, Message } from '@santiment-network/ui'
import { selectIsTelegramConnected } from '../../../../../pages/UserSelectors'
import { allProjectsForSearchGQL } from '../../../../../pages/Projects/allProjectsGQL'
import { fetchHistorySignalPoints, removeTrigger } from '../../../requx/actions'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikCheckboxes from '../../../../../components/formik-santiment-ui/FormikCheckboxes'
import FormikToggle from '../../../../../components/formik-santiment-ui/FormikToggle'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import styles from './TriggerForm.module.scss'
import { TriggerFormHeader } from '../header/TriggerFormHeader'

import {
  DAILY_ACTIVE_ADDRESSES,
  PRICE_PERCENT_CHANGE,
  PRICE_VOLUME_DIFFERENCE,
  METRICS,
  PRICE_TYPES,
  METRICS_DEPENDENCIES,
  METRIC_DEFAULT_VALUES,
  FREQUENCY_TYPES,
  DEFAULT_FORM_META_SETTINGS,
  ASSETS_FILTERS,
  frequencyTymeValueBuilder,
  getTypeByMetric,
  getFrequencyTimeType,
  getFrequencyTimeValues,
  getNearestFrequencyTimeValue,
  getNearestFrequencyTypeValue
} from '../../../utils/utils'

const REQUIRED_MESSAGE = 'Required'

const MUST_BE_MORE_ZERO_MESSAGE = 'Must be more 0'

const validate = values => {
  let errors = {}

  if (
    values.type.value === DAILY_ACTIVE_ADDRESSES ||
    values.type.value === PRICE_PERCENT_CHANGE
  ) {
    if (!values.percentThreshold) {
      errors.percentThreshold = REQUIRED_MESSAGE
    } else if (values.percentThreshold <= 0) {
      errors.percentThreshold = MUST_BE_MORE_ZERO_MESSAGE
    }
    if (!values.timeWindow) {
      errors.timeWindow = REQUIRED_MESSAGE
    } else if (values.timeWindow <= 0) {
      errors.timeWindow = MUST_BE_MORE_ZERO_MESSAGE
    }
  }
  if (values.type.value === PRICE_VOLUME_DIFFERENCE) {
    if (!values.threshold) {
      errors.threshold = REQUIRED_MESSAGE
    } else if (values.threshold < 0) {
      errors.threshold = MUST_BE_MORE_ZERO_MESSAGE
    }
  }
  if (values.channels && values.channels.length === 0) {
    errors.channels = 'You must setup notification channel'
  }

  if (!values.frequencyType || !values.frequencyType.value) {
    errors.frequencyType = REQUIRED_MESSAGE
  }

  if (!values.frequencyTimeValue || !values.frequencyTimeValue.value) {
    errors.frequencyTimeValue = REQUIRED_MESSAGE
  }

  if (!values.frequencyTimeType || !values.frequencyTimeType.value) {
    errors.frequencyTimeType = REQUIRED_MESSAGE
  }

  return errors
}

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  isTelegramConnected: PropTypes.bool.isRequired,
  canRedirect: PropTypes.bool,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any
}

export const TriggerForm = ({
  onSettingsChange,
  getSignalBacktestingPoints,
  data: { allProjects = [] },
  isTelegramConnected = false,
  settings,
  metaFormSettings,
  trigger,
  removeSignal,
  onRemovedSignal
}) => {
  metaFormSettings = { ...DEFAULT_FORM_META_SETTINGS, ...metaFormSettings }
  settings = { ...METRIC_DEFAULT_VALUES[PRICE_PERCENT_CHANGE], ...settings }

  settings = {
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
    ...settings
  }

  const [initialValues, setInitialValues] = useState(settings)
  const [showTrigger, setShowTrigger] = useState(true)

  const defaultSignalType = metaFormSettings.signalType
  const defaultAsset = metaFormSettings.target
  const defaultMetric = metaFormSettings.metric
  const defaultType = metaFormSettings.type
  const defaultFrequencyType = metaFormSettings.frequencyType

  console.log(defaultSignalType)

  /* useEffect(() => {
    getSignalBacktestingPoints(mapValuesToTriggerProps(initialValues))
  }, []) */

  const setDefaultPriceValues = values => {
    const newValues = { ...values, ...METRIC_DEFAULT_VALUES[values.type.value] }
    setInitialValues(newValues)
    /* window.setTimeout(() => {
      getSignalBacktestingPoints(mapValuesToTriggerProps(newValues))
    }, 0) */
  }

  const showTriggerFunc = () => {
    setShowTrigger(!showTrigger)
  }

  const deleteTrigger = () => {
    trigger.id && removeSignal(trigger.id)
    onRemovedSignal && onRemovedSignal()
  }

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid
      enableReinitialize
      validate={validate}
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
      }) => (
        <Form className={styles.TriggerForm}>
          <FormikEffect
            onChange={(current, prev) => {
              if (current.values.type.value !== prev.values.type.value) {
                setDefaultPriceValues(current.values)
                validateForm()
              }

              /* if (!isEqual(current.values, prev.values)) {
              const lastErrors = validate(current.values)
              const isError = Object.keys(current.values).reduce(
                (acc, val) => {
                  if (lastErrors.hasOwnProperty(val)) {
                    acc = true
                  }
                  return acc
                },
                false
              )

              !!current.values.target &&
                !isError &&
                getSignalBacktestingPoints(mapValuesToTriggerProps(values))
              } */
            }}
          />

          <div className={styles.triggerFormItem}>
            <TriggerFormHeader
              deleteTriggerFunc={deleteTrigger}
              name={trigger.title}
              showTrigger={showTrigger}
              showTriggerFunc={showTriggerFunc}
              actionsEnabled={false} // Make dynamic if triggers more than 1 (in future)
            />

            {showTrigger && (
              <div className={styles.Trigger}>
                <div className={styles.row}>
                  <div className={styles.Field}>
                    <label>Asset</label>
                    <FormikSelect
                      name='signalType'
                      isDisabled={defaultSignalType.isDisabled}
                      defaultValue={defaultSignalType.value.value}
                      placeholder='Pick signal type'
                      options={ASSETS_FILTERS}
                    />
                  </div>
                  <div className={styles.Field}>
                    <label>&nbsp;</label>
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

                <div className={styles.row}>
                  <div className={styles.Field}>
                    <label>Metrics</label>
                    <div>
                      <FormikSelect
                        name='metric'
                        isClearable={false}
                        isDisabled={defaultMetric.isDisabled}
                        defaultValue={defaultMetric.value}
                        isSearchable
                        placeholder='Choose a metric'
                        options={METRICS}
                        onChange={metric => {
                          values.metric &&
                            metric.value !== values.metric.value &&
                            setFieldValue('type', getTypeByMetric(metric))
                        }}
                      />
                    </div>
                  </div>
                  {PRICE_TYPES[(values.metric || {}).value] &&
                    PRICE_TYPES[(values.metric || {}).value].length > 1 && (
                    <div className={styles.Field}>
                      <label>&nbsp;</label>
                      <FormikSelect
                        name='type'
                        isClearable={false}
                        isSearchable
                        isDisabled={defaultType.isDisabled}
                        defaultValue={defaultType.value}
                        placeholder='Choose a type'
                        options={PRICE_TYPES[values.metric.value]}
                        isOptionDisabled={option => !option.value}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.row}>
                  {values.type &&
                    METRICS_DEPENDENCIES[values.type.value].includes(
                      'percentThreshold'
                    ) && (
                    <div className={styles.Field}>
                      <label>Percentage change</label>
                      <FormikInput
                        name='percentThreshold'
                        type='number'
                        placeholder='Setup the percentage change'
                      />
                    </div>
                  )}
                  {values.type &&
                    METRICS_DEPENDENCIES[values.type.value].includes(
                      'threshold'
                    ) && (
                    <div className={styles.Field}>
                      <label>Threshold</label>
                      <FormikInput
                        name='threshold'
                        step={0.001}
                        type='number'
                        placeholder='Setup the threshold'
                      />
                    </div>
                  )}
                  {values.type &&
                    METRICS_DEPENDENCIES[values.type.value].includes(
                      'timeWindow'
                    ) && (
                    <div className={styles.Field}>
                      <label>Time Window</label>
                      <div className={styles.timeWindow}>
                        <div className={styles.timeWindowInput}>
                          <FormikInput
                            name='timeWindow'
                            type='number'
                            min={0}
                            placeholder='Setup the time window'
                          />
                        </div>
                        <FormikSelect
                          name='timeWindowUnit'
                          className={styles.timeWindowUnit}
                          clearable={false}
                          placeholder='Unit'
                          options={[
                            { value: 'h', label: 'Hours' },
                            { value: 'd', label: 'Days' }
                          ]}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.row}>
                  <div className={styles.Field}>
                    <label>Frequency of notifications</label>
                    <FormikSelect
                      name='frequencyType'
                      isClearable={false}
                      isDisabled={defaultFrequencyType.isDisabled}
                      defaultValue={defaultFrequencyType.value.value}
                      isSearchable
                      placeholder='Choose frequency'
                      options={FREQUENCY_TYPES}
                      onChange={frequencyType => {
                        const newFrequencyTimeType = getNearestFrequencyTypeValue(
                          frequencyType
                        )
                        setFieldValue('frequencyTimeType', newFrequencyTimeType)
                        setFieldValue(
                          'frequencyTimeValue',
                          getNearestFrequencyTimeValue(newFrequencyTimeType)
                        )
                      }}
                    />
                  </div>
                  <div className={styles.Field}>
                    <label>&nbsp;</label>

                    <div className={styles.frequency}>
                      <FormikSelect
                        name='frequencyTimeValue'
                        className={styles.frequencyTimeValue}
                        isClearable={false}
                        isDisabled={
                          !values.frequencyType || !values.frequencyTimeType
                        }
                        isSearchable
                        options={getFrequencyTimeValues(
                          values.frequencyTimeType
                        )}
                      />
                      <FormikSelect
                        className={styles.frequencyTimeType}
                        name='frequencyTimeType'
                        isDisabled={!values.frequencyType}
                        isClearable={false}
                        onChange={frequencyTimeType => {
                          setFieldValue(
                            'frequencyTimeValue',
                            frequencyTymeValueBuilder(1)
                          )
                        }}
                        options={getFrequencyTimeType(values.frequencyType)}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.Field}>
                    <div className={styles.isRepeating}>
                      <FormikToggle name='isRepeating' />
                      <span>
                        {values.isRepeating
                          ? 'Task never ends'
                          : 'Task fires only once'}
                      </span>
                    </div>
                  </div>
                </div>

                <label>Notify me via</label>
                <div className={styles.row}>
                  <div className={cx(styles.Field, styles.notifyBlock)}>
                    <FormikCheckboxes
                      name='channels'
                      disabledIndexes={['email']}
                      options={['email', 'telegram']}
                      styles={{ marginRight: 5 }}
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

                {errors.channels && (
                  <div className={cx(styles.row, styles.messages)}>
                    <Message variant='warn'>{errors.channels}</Message>
                  </div>
                )}
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
      )}
    </Formik>
  )
}

TriggerForm.propTypes = propTypes

const mapStateToProps = state => ({
  isTelegramConnected: selectIsTelegramConnected(state)
})

const mapDispatchToProps = dispatch => ({
  getSignalBacktestingPoints: payload => {
    if (payload.settings.time_window) {
      dispatch(fetchHistorySignalPoints(payload))
    }
  },
  removeSignal: id => {
    dispatch(removeTrigger(id))
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(allProjectsForSearchGQL)
)

export default enhance(TriggerForm)
