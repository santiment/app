import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import {
  PanelWithHeader as Panel,
  Button,
  Message
} from '@santiment-network/ui'
import { selectIsTelegramConnected } from './../../pages/UserSelectors'
import { allProjectsForSearchGQL } from './../../pages/Projects/allProjectsGQL'
import { fetchHistorySignalPoints } from './actions'
import FormikInput from './../../components/formik-santiment-ui/FormikInput'
import FormikSelect from './../../components/formik-santiment-ui/FormikSelect'
import FormikSelector from './../../components/formik-santiment-ui/FormikSelector'
import FormikCheckboxes from './../../components/formik-santiment-ui/FormikCheckboxes'
import FormikToggle from './../../components/formik-santiment-ui/FormikToggle'
import FormikEffect from './FormikEffect'
import SignalPreview from './SignalPreview'
import styles from './TriggerForm.module.scss'

import {
  DAILY_ACTIVE_ADDRESSES,
  PRICE_PERCENT_CHANGE,
  PRICE_VOLUME_DIFFERENCE,
  PRICE_CHANGE_TYPES,
  pricePercentChangeUp
} from './utils'

const METRICS = [
  { label: 'Price', value: 'price' },
  // { label: 'Trending Words', value: 'trendingWords' },
  { label: 'Daily Active Addresses', value: DAILY_ACTIVE_ADDRESSES },
  { label: 'Price/volume difference', value: PRICE_VOLUME_DIFFERENCE }
]

const PRICE_TYPES = {
  price: [
    {
      label: 'Price changing',
      options: [
        {
          value: '',
          label: 'More than'
        },
        {
          value: '',
          label: 'Less than'
        },
        {
          value: '',
          label: 'Entering channel'
        },
        {
          value: '',
          label: 'Outside channel'
        }
      ]
    },
    {
      label: 'Percent change',
      options: [
        pricePercentChangeUp,
        {
          value: PRICE_PERCENT_CHANGE,
          label: 'Moving down %',
          type: PRICE_CHANGE_TYPES.MOVING_DOWN
        }
      ]
    }
  ],
  daily_active_addresses: [
    { label: 'Daily Active Addresses', value: DAILY_ACTIVE_ADDRESSES }
  ],
  price_volume_difference: [
    { label: 'Price/volume difference', value: PRICE_VOLUME_DIFFERENCE }
  ],
  price_percent_change: [
    { label: 'Price percentage change', value: PRICE_PERCENT_CHANGE }
  ]
}

const ARGS = {
  price_volume_difference: ['threshold'],
  daily_active_addresses: ['percentThreshold', 'timeWindow'],
  price_percent_change: ['percentThreshold', 'timeWindow']
}

const METRIC_DEFAULT_VALUES = {
  price_percent_change: {
    cooldown: '24h',
    percentThreshold: 5,
    timeWindow: 24,
    timeWindowUnit: { label: 'hours', value: 'h' },
    type: pricePercentChangeUp,
    isRepeating: true,
    channels: ['telegram']
  },
  daily_active_addresses: {
    cooldown: '24h',
    percentThreshold: 200,
    timeWindow: 2,
    timeWindowUnit: { label: 'days', value: 'd' },
    type: { label: 'Daily Active Addresses', value: DAILY_ACTIVE_ADDRESSES },
    isRepeating: true,
    channels: ['telegram']
  },
  price_volume_difference: {
    cooldown: '24h',
    threshold: 0.002,
    type: {
      label: 'Price/volume difference',
      value: PRICE_VOLUME_DIFFERENCE
    },
    isRepeating: true,
    channels: ['telegram']
  }
}

const getTypeByMetric = metric => {
  if (metric.value === 'price') {
    return pricePercentChangeUp
  } else {
    return PRICE_TYPES[metric.value][0]
  }
}

const mapValuesToTriggerProps = ({
  type,
  timeWindowUnit,
  timeWindow,
  percentThreshold,
  target,
  metric,
  threshold,
  cooldown
}) => ({
  cooldown,
  settings: (() => {
    const metricType = type ? type.value : undefined
    const time = timeWindowUnit ? timeWindow + timeWindowUnit.value : undefined

    const slug = { slug: target.value }

    const defaultValue = {
      target: slug,
      type: metricType,
      percent_threshold: percentThreshold,
      time_window: time
    }

    if (!metric) {
      return defaultValue
    }

    switch (metric.value) {
      case DAILY_ACTIVE_ADDRESSES:
        return {
          target: slug,
          type: metricType,
          time_window: time,
          percent_threshold: percentThreshold
        }
      case PRICE_VOLUME_DIFFERENCE:
        return {
          target: slug,
          type: metricType,
          threshold: threshold
        }
      default:
        return defaultValue
    }
  })()
})

const validate = values => {
  let errors = {}

  if (
    values.type.value === DAILY_ACTIVE_ADDRESSES ||
    values.type.value === PRICE_PERCENT_CHANGE
  ) {
    if (!values.percentThreshold) {
      errors.percentThreshold = 'Required'
    } else if (values.percentThreshold <= 0) {
      errors.percentThreshold = 'Must be more 0'
    }
    if (!values.timeWindow) {
      errors.timeWindow = 'Required'
    } else if (values.timeWindow <= 0) {
      errors.timeWindow = 'Must be more 0'
    }
  }
  if (values.type.value === PRICE_VOLUME_DIFFERENCE) {
    if (!values.threshold) {
      errors.threshold = 'Required'
    } else if (values.threshold < 0) {
      errors.threshold = 'Must be more 0'
    }
  }
  if (values.channels && values.channels.length === 0) {
    errors.channels = 'You must setup notification channel'
  }
  return errors
}

const getMetricsByType = type => {
  switch (type.value) {
    case DAILY_ACTIVE_ADDRESSES:
      return ['active_addresses', 'price']
    case PRICE_VOLUME_DIFFERENCE:
      return ['price', 'volume']
    default:
      return ['price']
  }
}

const DEFAULT_FORM_META_SETTINGS = {
  target: {
    isDisabled: false,
    value: {
      value: 'santiment',
      label: 'santiment'
    }
  },
  metric: {
    isDisabled: false,
    value: {
      value: 'price',
      label: 'Price'
    }
  },
  type: {
    isDisabled: false,
    value: { ...pricePercentChangeUp }
  }
}

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  isTelegramConnected: PropTypes.bool.isRequired
}

export const TriggerForm = ({
  onSettingsChange,
  getSignalBacktestingPoints,
  data: { allProjects = [] },
  isTelegramConnected = false,
  settings,
  metaFormSettings
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
    ...settings
  }

  const [initialValues, setInitialValues] = useState(settings)

  useEffect(() => {
    getSignalBacktestingPoints(mapValuesToTriggerProps(initialValues))
  }, [])

  const defaultAsset = metaFormSettings.target
  const defaultMetric = metaFormSettings.metric
  const defaultType = metaFormSettings.type

  const setDefaultPriceValues = values => {
    const newValues = { ...values, ...METRIC_DEFAULT_VALUES[values.type.value] }
    setInitialValues(newValues)
    window.setTimeout(() => {
      getSignalBacktestingPoints(mapValuesToTriggerProps(newValues))
    }, 0)
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
        <Form>
          <FormikEffect
            onChange={(current, prev) => {
              if (current.values.type.value !== prev.values.type.value) {
                setDefaultPriceValues(current.values)
                validateForm()
                return
              }
              if (!isEqual(current.values, prev.values)) {
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
              }
            }}
          />
          <div className={styles.Trigger}>
            <Panel header='Trigger #' className={styles.TriggerPanel}>
              <div className={styles.row}>
                <div className={styles.Field}>
                  <label>Asset</label>
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
                <label>Metrics</label>
              </div>
              <div className={styles.row}>
                <div className={styles.Field}>
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
                {PRICE_TYPES[(values.metric || {}).value] &&
                  PRICE_TYPES[(values.metric || {}).value].length > 1 && (
                  <div className={styles.Field}>
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
                  ARGS[values.type.value].includes('percentThreshold') && (
                  <div className={styles.Field}>
                    <label>Percentage change</label>
                    <FormikInput
                      name='percentThreshold'
                      type='number'
                      placeholder='Setup the percentage change'
                    />
                  </div>
                )}
                {values.type && ARGS[values.type.value].includes('threshold') && (
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
                {values.type && ARGS[values.type.value].includes('timeWindow') && (
                  <div className={styles.Field}>
                    <label>Time Window</label>
                    <div className={styles.timeWindow}>
                      <FormikInput
                        name='timeWindow'
                        type='number'
                        min={0}
                        className={styles.timeWindowInput}
                        placeholder='Setup the time window'
                      />
                      <FormikSelect
                        name='timeWindowUnit'
                        className={styles.timeWindowUnit}
                        clearable={false}
                        placeholder='Unit'
                        options={[
                          { value: 'h', label: 'hours' },
                          { value: 'd', label: 'days' }
                        ]}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.row}>
                <div className={styles.Field}>
                  <label>Message Frequency</label>
                  <div>Once per</div>
                  <div className={styles.Field}>
                    <FormikSelector
                      name='cooldown'
                      options={['1h', '24h']}
                      defaultSelected={'1h'}
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
                <div className={styles.Field}>
                  <FormikCheckboxes
                    name='channels'
                    disabledIndexes={['email']}
                    options={['email', 'telegram']}
                    styles={{ marginRight: 15 }}
                  />
                </div>
                {!isTelegramConnected && (
                  <Button
                    className={styles.connectLink}
                    variant='ghost'
                    as={Link}
                    to='/account'
                  >
                    Telegram<span className={styles.connectLink}>Connect</span>
                  </Button>
                )}
              </div>

              {errors.channels && (
                <div className={cx(styles.row, styles.messages)}>
                  <Message variant='warn'>{errors.channels}</Message>
                </div>
              )}

              <div>
                <label>Visual Backtesting</label>
                <SignalPreview
                  target={values.target.value}
                  initialMetrics={getMetricsByType(values.type)}
                  type={values.type}
                />
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
            </Panel>
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
