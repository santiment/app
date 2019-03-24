import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import {
  Button,
  Input,
  Select,
  Checkboxes,
  Selector,
  SearchWithSuggestions,
  Message
} from '@santiment-network/ui'
import { selectIsTelegramConnected } from './../../pages/UserSelectors'
import { allProjectsForSearchGQL } from './../../pages/Projects/allProjectsGQL'
import { fetchHistorySignalPoints } from './actions'
import FormikEffect from './FormikEffect'
import SignalPreview from './SignalPreview'
import styles from './TriggerForm.module.scss'

const METRICS = [
  { label: 'Price', value: 'price' },
  { label: 'Trending Words', value: 'trendingWords' }
]

const TYPES = {
  price: [
    { label: 'Percentage Change', value: 'price_percent_change' },
    { label: 'Absolute', value: 'price_absolute_change' }
  ]
}

const initialValues = {
  cooldown: 24,
  percentThreshold: 5,
  target: 'ethereum',
  metric: {
    label: 'Price',
    value: 'price'
  },
  timeWindow: 24,
  type: TYPES['price'][0],
  channel: 'Telegram'
}

const mapValuesToTriggerProps = values => ({
  cooldown: values.cooldown + 'h',
  settings: {
    percent_threshold: values.percentThreshold,
    target: { slug: values.target },
    time_window: values.timeWindow + 'h',
    type: values.type.value
  }
})

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  isTelegramConnected: PropTypes.bool.isRequired
}

export const TriggerForm = ({
  onSettingsChange,
  getSignalBacktestingPoints,
  data: { allProjects = [] },
  isTelegramConnected = false
}) => {
  useEffect(() => {
    getSignalBacktestingPoints(mapValuesToTriggerProps(initialValues))
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid
      validate={values => {
        let errors = {}
        if (!values.percentThreshold) {
          errors.percentThreshold = 'Required'
        } else if (values.percentThreshold <= 0) {
          errors.percentThreshold = 'Must be more 0'
        }
        if (values.channel !== 'Telegram') {
          errors.channel = 'You must setup notification channel'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        onSettingsChange({ values })
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        isValid
      }) => (
        <Form>
          <FormikEffect
            onChange={(current, prev) => {
              if (!isEqual(current.values, prev.values)) {
                !!current.values.target &&
                  getSignalBacktestingPoints(mapValuesToTriggerProps(values))
              }
            }}
          />
          <div className={styles.row}>
            <div className={styles.Field}>
              <label>Asset</label>
              <Field
                name='target'
                render={({ field, form }) => (
                  <Select
                    options={allProjects.map(asset => ({
                      label: asset.slug,
                      value: asset.slug
                    }))}
                    onChange={data => {
                      form.setFieldValue('target', (data || {}).value)
                      form.setFieldTouched('target', true)
                    }}
                    value={{
                      label: field.value,
                      value: field.value
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.row}>
            <label>Metrics</label>
          </div>
          <div className={styles.row}>
            <FieldCustomSelect
              name='metric'
              placeholder='Choose a metric'
              options={METRICS}
            />
            {TYPES[(values.metric || {}).value] &&
              TYPES[(values.metric || {}).value].length > 0 && (
              <FieldCustomSelect
                name='type'
                placeholder='Choose a type'
                options={TYPES[values.metric.value]}
              />
            )}
          </div>

          {values.metric !== 'trendingWords' && (
            <div className={styles.row}>
              <div className={styles.Field}>
                <label>Percentage change</label>
                <Field
                  value={values.percentThreshold}
                  id='percentThreshold'
                  autoComplete='nope'
                  type='number'
                  name='percentThreshold'
                  placeholder='Setup the percentage change'
                  isError={errors.percentThreshold}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  component={Input}
                />
              </div>
              <div className={styles.Field}>
                <label>Time Window</label>
                <Field
                  value={values.timeWindow}
                  id='timeWindow'
                  autoComplete='nope'
                  type='number'
                  name='timeWindow'
                  placeholder='Setup the time window'
                  isError={errors.timeWindow}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  component={Input}
                />
              </div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.Field}>
              <label>Message Frequency</label>
              <FieldCustomSelector name='cooldown' options={['1h', '24h']} />
            </div>
          </div>
          <div className={styles.row}>
            <FieldCustomCheckboxes
              name='channel'
              disabledIndexes='Email'
              options={['Email', 'Telegram']}
            />
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

          {errors.channel && (
            <div className={cx(styles.row, styles.messages)}>
              <Message variant='warn'>{errors.channel}</Message>
            </div>
          )}
          <SignalPreview />
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

const FieldCustomSelect = ({
  options,
  name,
  disabled = false,
  placeholder
}) => (
  <div className={styles.Field}>
    <Field
      name={name}
      render={({ field, form }) => (
        <Select
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          onChange={value => {
            form.setFieldValue(name, value)
            form.setFieldTouched(name, true)
          }}
          value={field.value}
        />
      )}
    />
  </div>
)

const FieldCustomSelector = ({ options, name, disabled = false }) => (
  <div className={styles.Field}>
    <Field
      name={name}
      render={({ field, form }) => (
        <Selector
          options={options}
          disabled={disabled}
          onSelectOption={value => {
            form.setFieldValue(name, value)
            form.setFieldTouched(name, true)
          }}
          defaultSelected={field.value}
        />
      )}
    />
  </div>
)

const FieldCustomCheckboxes = ({
  options,
  disabledIndexes,
  name,
  disabled = false,
  style
}) => (
  <div className={styles.Field}>
    <Field
      name={name}
      render={({ field, form }) => (
        <Checkboxes
          options={options}
          disabledIndexes={disabledIndexes}
          defaultSelectedIndexes={field.value}
          onSelect={value => {
            form.setFieldValue(name, value)
            form.setFieldTouched(name, true)
            // form.current.validateForm()
          }}
          style={style}
        />
      )}
    />
  </div>
)

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
