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

const METRICS = [
  { label: 'Price', value: 'price' },
  // { label: 'Trending Words', value: 'trendingWords' },
  { label: 'Daily Active Addresses', value: 'daily_active_addresses' },
  { label: 'Price/volume difference', value: 'price_volume_difference' }
]

const OPERATIONS = {
  price_absolute_change: [
    'above',
    'below',
    'inside_channel',
    'outside_channel'
  ],
  price_percent_change: ['percent_up', 'percent_down']
}

const TYPES = {
  price: [
    {
      label: 'Price changing',
      options: [
        {
          value: 'above',
          label: 'More than'
        },
        {
          value: 'below',
          label: 'Less than'
        },
        {
          value: 'inside_channel',
          label: 'Entering channel'
        },
        {
          value: 'outside_channel',
          label: 'Outside channel'
        }
      ]
    },
    {
      label: 'Percent change',
      options: [
        {
          value: 'percent_up',
          label: 'Moving up %'
        },
        {
          value: 'percent_down',
          label: 'Moving down %'
        }
      ]
    }
  ],
  daily_active_addresses: [
    { label: 'Daily Active Addresses', value: 'daily_active_addresses' }
  ],
  price_volume_difference: [
    { label: 'Price/volume difference', value: 'price_volume_difference' }
  ]
}

const ARGS = {
  price_volume_difference: ['threshold'],
  daily_active_addresses: ['percentThreshold', 'timeWindow'],
  price_percent_change: ['percentThreshold', 'timeWindow']
}

const defaultValues = {
  price_percent_change: {
    cooldown: '24h',
    percentThreshold: 5,
    target: { value: 'santiment', label: 'santiment' },
    timeWindow: 24,
    timeWindowUnit: { label: 'hours', value: 'h' },
    type: { value: 'price_percent_change', label: 'Moving up %' },
    operation: { value: 'percent_up', label: 'Moving up %' },
    metric: { label: 'Price', value: 'price' },
    isRepeating: true,
    channels: ['telegram']
  },
  daily_active_addresses: {
    cooldown: '24h',
    percentThreshold: 200,
    target: { value: 'santiment', label: 'santiment' },
    metric: {
      label: 'Daily Active Addresses',
      value: 'daily_active_addresses'
    },
    timeWindow: 2,
    timeWindowUnit: { label: 'days', value: 'd' },
    type: { label: 'Daily Active Addresses', value: 'daily_active_addresses' },
    isRepeating: true,
    channels: ['telegram']
  },
  price_volume_difference: {
    cooldown: '24h',
    threshold: 0.002,
    target: { value: 'santiment', label: 'santiment' },
    metric: {
      label: 'Price/volume difference',
      value: 'price_volume_difference'
    },
    type: {
      label: 'Price/volume difference',
      value: 'price_volume_difference'
    },
    isRepeating: true,
    channels: ['telegram']
  }
}

const DEFAULT_FORM_SETTINGS = defaultValues['price_percent_change']

const getTypeByMetric = metric => {
  if (metric.value === 'price') {
    return {
      value: 'price_percent_change',
      label: 'Moving up %'
    }
  } else {
    return TYPES[metric.value][0]
  }
}

const mapValuesToTriggerProps = values => ({
  cooldown: values.cooldown,
  settings: (() => {
    switch (values.metric.value) {
      case 'daily_active_addresses':
        return {
          percent_threshold: values.percentThreshold,
          target: { slug: values.target.value },
          time_window: values.timeWindow + values.timeWindowUnit.value,
          type: values.type.value
        }
      case 'price_volume_difference':
        return {
          target: { slug: values.target.value },
          threshold: values.threshold,
          type: values.type.value
        }
      default:
        return {
          percent_threshold: values.percentThreshold,
          target: { slug: values.target.value },
          time_window: values.timeWindow + values.timeWindowUnit.value,
          type: values.type.value
        }
    }
  })()
})

const validate = values => {
  let errors = {}

  if (
    values.type.value === 'daily_active_addresses' ||
    values.type.value === 'price_percent_change'
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
  if (values.type.value === 'price_volume_difference') {
    if (!values.threshold) {
      errors.threshold = 'Required'
    } else if (values.threshold < 0) {
      errors.threshold = 'Must be more 0'
    }
  }
  if (values.channels.length === 0) {
    errors.channels = 'You must setup notification channel'
  }
  return errors
}

const getMetricsByType = type => {
  switch (type.value) {
    case 'daily_active_addresses':
      return ['active_addresses', 'price']
    case 'price_volume_difference':
      return ['price', 'volume']
    default:
      return ['price']
  }
}

const DEFAULT_FORM_META_SETTINGS = {
  target: {
    isDisabled: false
  },
  type: {
    isDisabled: false
  },
  metric: {
    isDisabled: false
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
  settings = DEFAULT_FORM_SETTINGS
  // metaFormSettings
}) => {
  // metaFormSettings = { ...DEFAULT_FORM_META_SETTINGS, ...metaFormSettings }
  // settings = {
  // ...settings,
  // target: metaFormSettings.target.value
  // ? metaFormSettings.target.value
  // : settings.target,
  // metric: metaFormSettings.metric.value
  // ? metaFormSettings.metric.value
  // : settings.metric,
  // type: metaFormSettings.type.value
  // ? metaFormSettings.type.value
  // : settings.type
  // }
  const [initialValues, setInitialValues] = useState(settings)

  // useEffect(() => {
  // getSignalBacktestingPoints(mapValuesToTriggerProps(initialValues))
  // }, [])

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
              console.table(current.values)
              if (current.values.type !== prev.values.type) {
                setInitialValues(defaultValues[current.values.type.value])
                validateForm()
                // window.setTimeout(() => {
                // getSignalBacktestingPoints(
                // mapValuesToTriggerProps(
                // defaultValues[current.values.type.value]
                // )
                // )
                // }, 0)
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

                //! !current.values.target &&
                //! isError &&
                // getSignalBacktestingPoints(mapValuesToTriggerProps(values))
              }
            }}
          />
          <div className={styles.Trigger}>
            <Panel header='Trigger #1' className={styles.TriggerPanel}>
              <div className={styles.row}>
                <div className={styles.Field}>
                  <label>Asset</label>
                  <FormikSelect
                    name='target'
                    // isDisabled={metaFormSettings.target.isDisabled}
                    // defaultValue={metaFormSettings.target.value}
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
                    // isDisabled={metaFormSettings.metric.isDisabled}
                    // defaultValue={metaFormSettings.metric.value}
                    isSearchable
                    placeholder='Choose a metric'
                    options={METRICS}
                    onChange={metric => {
                      metric.value !== values.metric.value &&
                        setFieldValue('type', getTypeByMetric(metric))
                    }}
                  />
                </div>
                {TYPES[(values.metric || {}).value] &&
                  TYPES[(values.metric || {}).value].length > 1 && (
                  <div className={styles.Field}>
                    <FormikSelect
                      name='type'
                      isClearable={false}
                      isSearchable
                      // isDisabled={metaFormSettings.type.isDisabled}
                      // defaultValue={metaFormSettings.type.value}
                      placeholder='Choose a type'
                      options={TYPES[values.metric.value]}
                      isOptionDisabled={option => !option.value}
                    />
                  </div>
                )}
              </div>

              <div className={styles.row}>
                {ARGS[values.type.value].includes('percentThreshold') && (
                  <div className={styles.Field}>
                    <label>Percentage change</label>
                    <FormikInput
                      name='percentThreshold'
                      type='number'
                      placeholder='Setup the percentage change'
                    />
                  </div>
                )}
                {ARGS[values.type.value].includes('threshold') && (
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
                {ARGS[values.type.value].includes('timeWindow') && (
                  <div className={styles.Field}>
                    <label>Time Window</label>
                    <div className={styles.timeWindow}>
                      <FormikInput
                        name='timeWindow'
                        type='number'
                        className={styles.timeWindowInput}
                        placeholder='Setup the time window'
                      />
                      <FormikSelect
                        name='timeWindowUnit'
                        className={styles.timeWindowUnit}
                        clearable={false}
                        placeholder='Choose unit'
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
                    <FormikSelector name='cooldown' options={['1h', '24h']} />
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
                    disabledIndexes={'email'}
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

              {
                // <label>Visual Backtesting</label>
                // <SignalPreview
                // target={values.target.value}
                // initialMetrics={getMetricsByType(values.type)}
                // type={values.type}
                /// >
              }
            </Panel>
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
    dispatch(fetchHistorySignalPoints(payload))
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
