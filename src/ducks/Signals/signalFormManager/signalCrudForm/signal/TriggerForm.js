import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import { Button, Message } from '@santiment-network/ui'
import { selectIsTelegramConnected } from '../../../../../pages/UserSelectors'
import { allProjectsForSearchGQL } from '../../../../../pages/Projects/allProjectsGQL'
import {
  fetchHistorySignalPoints,
  removeTrigger
} from '../../../common/actions'
import FormikCheckboxes from '../../../../../components/formik-santiment-ui/FormikCheckboxes'
import FormikToggle from '../../../../../components/formik-santiment-ui/FormikToggle'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import { TriggerFormHeader } from '../header/TriggerFormHeader'
import styles from './TriggerForm.module.scss'

import {
  PRICE_PERCENT_CHANGE,
  METRIC_DEFAULT_VALUES,
  DEFAULT_FORM_META_SETTINGS
} from '../../../utils/constants'

import {
  getMetricsByType,
  mapValuesToTriggerProps,
  validateTriggerForm
} from '../../../utils/utils'
import { TriggerFormAssetWallet } from '../formParts/TriggerFormAssetWallet'
import { TriggerFormMetricValues } from '../formParts/TriggerFormMetricValues'
import { TriggerFormMetricTypes } from '../formParts/TriggerFormMetricTypes'
import { TriggerFormFrequency } from '../formParts/TriggerFormFrequency'
import SignalPreview from '../../../chart/SignalPreview'

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
  const formMetric =
    metaFormSettings && metaFormSettings.metric
      ? metaFormSettings.metric.value.value
      : PRICE_PERCENT_CHANGE

  metaFormSettings = { ...DEFAULT_FORM_META_SETTINGS, ...metaFormSettings }
  settings = { ...METRIC_DEFAULT_VALUES[formMetric], ...settings }

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
    address: metaFormSettings.address,
    ...settings
  }

  const [initialValues, setInitialValues] = useState(settings)
  const [showTrigger, setShowTrigger] = useState(true)

  useEffect(() => {
    getSignalBacktestingPoints(mapValuesToTriggerProps(initialValues))
  }, [])

  const setDefaultPriceValues = values => {
    const newValues = { ...values, ...METRIC_DEFAULT_VALUES[values.type.value] }
    setInitialValues(newValues)
  }

  const showTriggerFunc = () => {
    setShowTrigger(!showTrigger)
  }

  const deleteTrigger = () => {
    trigger && trigger.id && removeSignal(trigger.id)
    onRemovedSignal && onRemovedSignal()
  }

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
        values: {
          metric,
          type,
          absoluteBorderRight,
          absoluteBorderLeft,
          frequencyType,
          frequencyTimeType,
          isRepeating
        },
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
              if (
                !prev.values.type ||
                current.values.type.value !== prev.values.type.value
              ) {
                setDefaultPriceValues(current.values)
                validateForm()
                return
              }

              if (!isEqual(current.values, prev.values)) {
                const lastErrors = validateTriggerForm(current.values)
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

          <div className={styles.triggerFormItem}>
            <TriggerFormHeader
              deleteTriggerFunc={deleteTrigger}
              name={trigger.title}
              showTrigger={showTrigger}
              showTriggerFunc={showTriggerFunc}
              actionsEnabled={false}
            />

            {showTrigger && (
              <div className={styles.Trigger}>
                <TriggerFormMetricTypes
                  metaFormSettings={metaFormSettings}
                  setFieldValue={setFieldValue}
                  metric={metric}
                />

                <TriggerFormAssetWallet
                  metric={metric}
                  metaFormSettings={metaFormSettings}
                  allProjects={allProjects}
                  setFieldValue={setFieldValue}
                />

                <TriggerFormMetricValues
                  type={type}
                  absoluteBorderLeft={absoluteBorderLeft}
                  absoluteBorderRight={absoluteBorderRight}
                />

                {trigger && trigger.id && (
                  <div className={cx(styles.row, styles.signalPreview)}>
                    <SignalPreview
                      target={values.target.value}
                      initialMetrics={getMetricsByType(values.type)}
                      type={values.type}
                    />
                  </div>
                )}

                <TriggerFormFrequency
                  metaFormSettings={metaFormSettings}
                  setFieldValue={setFieldValue}
                  frequencyType={frequencyType}
                  frequencyTimeType={frequencyTimeType}
                />

                <div className={styles.row}>
                  <div className={styles.Field}>
                    <div className={styles.isRepeating}>
                      <FormikToggle name='isRepeating' />
                      <span>
                        {isRepeating
                          ? 'Task never ends'
                          : 'Task fires only once'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.Field}>
                    <label>Notify me via</label>
                    <div className={styles.notifyBlock}>
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
