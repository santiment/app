import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import { Button, Message } from '@santiment-network/ui'
import { selectIsTelegramConnected } from './../../pages/UserSelectors'
import { allProjectsForSearchGQL } from './../../pages/Projects/allProjectsGQL'
import { fetchHistorySignalPoints } from './actions'
import FormikInput from './../../components/formik-santiment-ui/FormikInput'
import FormikSelect from './../../components/formik-santiment-ui/FormikSelect'
import FormikSelector from './../../components/formik-santiment-ui/FormikSelector'
import FormikCheckboxes from './../../components/formik-santiment-ui/FormikCheckboxes'
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
  cooldown: '24h',
  percentThreshold: 5,
  target: 'ethereum',
  metric: {
    label: 'Price',
    value: 'price'
  },
  timeWindow: 24,
  type: TYPES['price'][0],
  channels: ['Telegram']
}

const mapValuesToTriggerProps = values => ({
  cooldown: values.cooldown,
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
        if (values.channels.length === 0) {
          errors.channels = 'You must setup notification channel'
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
              <FormikSelect
                name='target'
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
                placeholder='Choose a metric'
                options={METRICS}
              />
            </div>
            {TYPES[(values.metric || {}).value] &&
              TYPES[(values.metric || {}).value].length > 0 && (
              <div className={styles.Field}>
                <FormikSelect
                  name='type'
                  placeholder='Choose a type'
                  options={TYPES[values.metric.value]}
                />
              </div>
            )}
          </div>

          {values.metric !== 'trendingWords' && (
            <div className={styles.row}>
              <div className={styles.Field}>
                <label>Percentage change</label>
                <FormikInput
                  name='percentThreshold'
                  type='number'
                  placeholder='Setup the percentage change'
                  errors={errors}
                  values={values}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={styles.Field}>
                <label>Time Window</label>
                <FormikInput
                  name='timeWindow'
                  type='number'
                  placeholder='Setup the time window'
                  errors={errors}
                  values={values}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.Field}>
              <label>Message Frequency</label>
              <div className={styles.Field}>
                <FormikSelector name='cooldown' options={['1h', '24h']} />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.Field}>
              <FormikCheckboxes
                name='channels'
                disabledIndexes={'Email'}
                options={['Email', 'Telegram']}
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
