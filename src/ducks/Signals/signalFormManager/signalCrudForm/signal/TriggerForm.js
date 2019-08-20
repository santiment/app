import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'recompose'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import {
  selectIsTelegramConnected,
  selectIsEmailConnected
} from '../../../../../pages/UserSelectors'
import {
  fetchHistorySignalPoints,
  removeTrigger
} from '../../../common/actions'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import Button from '@santiment-network/ui/Button'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes'
import {
  PRICE_PERCENT_CHANGE,
  METRIC_DEFAULT_VALUES,
  DEFAULT_FORM_META_SETTINGS,
  METRIC_TO_TYPES,
  MAX_DESCR_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  TRIGGER_FORM_STEPS
} from '../../../utils/constants'
import {
  couldShowChart,
  mapFormPropsToTrigger,
  mapTargetObject,
  validateTriggerForm,
  getDefaultFormValues,
  titleMetricValuesHeader,
  getNewTitle,
  getNewDescription
} from '../../../utils/utils'
import { TriggerFormMetricValues } from '../formParts/TriggerFormMetricValues'
import { TriggerFormMetricTypes } from '../formParts/metricTypes/TriggerFormMetricTypes'
import { TriggerFormFrequency } from '../formParts/TriggerFormFrequency'
import SignalPreview from '../../../chart/SignalPreview'
import TriggerMetricTypesResolver from '../formParts/TriggerMetricTypesResolver'
import TriggerFormBlock, {
  TriggerFormBlockDivider
} from '../formParts/block/TriggerFormBlock'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikTextarea from '../../../../../components/formik-santiment-ui/FormikTextarea'
import TriggerFormChannels from '../formParts/channels/TriggerFormChannels'
import styles from './TriggerForm.module.scss'

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  isTelegramConnected: PropTypes.bool.isRequired,
  lastPriceItem: PropTypes.any,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any
}

export const TriggerForm = ({
  onSettingsChange,
  getSignalBacktestingPoints,
  isTelegramConnected = false,
  isEmailConnected = false,
  lastPriceItem,
  settings,
  metaFormSettings,
  id,
  formChangedCallback,
  isShared
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
  const [canCallFormChangCallback, setCanCallFormChanged] = useState(false)

  useEffect(() => {
    couldShowChart(initialValues) && getSignalBacktestingPoints(initialValues)
  }, [])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      !canCallFormChangCallback && setCanCallFormChanged(true)
    })

    return () => {
      clearTimeout(timeOutId)
      setCanCallFormChanged(false)
      formChangedCallback(false)
    }
  }, [])

  const toggleSignalPublic = () => {
    setInitialValues({ ...initialValues, isPublic: !initialValues.isPublic })
  }

  const [step, setStep] = useState(
    id ? TRIGGER_FORM_STEPS.DESCRIPTION : TRIGGER_FORM_STEPS.DESCRIPTION
  )

  const validateAndSetStep = newStep => {
    if (!id) {
      newStep > step && setStep(newStep)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid={!!id}
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
          type = {},
          target,
          frequencyType,
          frequencyTimeType,
          isRepeating,
          ethAddress,
          isPublic,
          description,
          channels
        } = values

        const { price } = lastPriceItem || {}

        const chartTarget = mapTargetObject(target)
        const showChart = target && couldShowChart(values)

        const typeSelectors = METRIC_TO_TYPES[(metric || {}).value]
        const showTypes =
          metric && !metric.hidden && typeSelectors && typeSelectors.length > 1

        const { dependencies: metricValueBlocks } = type

        const showValues = showTypes || showChart || metricValueBlocks

        if (!showValues && step === TRIGGER_FORM_STEPS.VALUES) {
          validateAndSetStep(TRIGGER_FORM_STEPS.DESCRIPTION)
        }

        return (
          <Form>
            <FormikEffect
              onChange={(current, prev) => {
                let { values: newValues } = current
                const changedMetric =
                  !prev.values.metric ||
                  newValues.metric.value !== prev.values.metric.value ||
                  newValues.type.value !== prev.values.type.value
                if (changedMetric) {
                  setInitialValues(
                    getDefaultFormValues(newValues, prev.values.metric)
                  )
                  validateForm()
                }

                if (!isEqual(newValues, prev.values)) {
                  validateForm()
                  const lastErrors = validateTriggerForm(newValues)
                  const isError = Object.keys(newValues).some(
                    key => lastErrors[key]
                  )

                  const canLoadChart = newValues && couldShowChart(newValues)

                  !isError &&
                    canLoadChart &&
                    getSignalBacktestingPoints(newValues)

                  if (!id && !isShared) {
                    !newValues.titleChangedByUser &&
                      setFieldValue('title', getNewTitle(newValues))
                    !newValues.descriptionChangedByUser &&
                      setFieldValue('description', getNewDescription(newValues))
                  }

                  canCallFormChangCallback &&
                    formChangedCallback &&
                    formChangedCallback(true)
                }
              }}
            />

            <div className={styles.triggerFormItem}>
              {step >= TRIGGER_FORM_STEPS.METRICS && (
                <TriggerFormMetricTypes
                  metaFormSettings={metaFormSettings}
                  setFieldValue={setFieldValue}
                  metric={metric}
                  target={target}
                />
              )}

              {step >= TRIGGER_FORM_STEPS.TYPES && (
                <TriggerMetricTypesResolver
                  address={ethAddress}
                  values={values}
                  metaFormSettings={metaFormSettings}
                  setFieldValue={setFieldValue}
                />
              )}

              {step >= TRIGGER_FORM_STEPS.VALUES && showValues && (
                <TriggerFormBlock
                  {...titleMetricValuesHeader(!!metricValueBlocks, values)}
                  className={styles.chainBlock}
                >
                  {(showTypes || metricValueBlocks) && (
                    <TriggerFormMetricValues
                      typeSelectors={typeSelectors}
                      metaFormSettings={metaFormSettings}
                      blocks={metricValueBlocks}
                      lastPrice={price}
                      values={values}
                      showTypes={showTypes}
                    />
                  )}

                  {showChart && (
                    <Fragment>
                      {(showTypes || metricValueBlocks) && (
                        <TriggerFormBlockDivider />
                      )}
                      <div className={styles.preview}>
                        <SignalPreview
                          target={chartTarget}
                          type={metric.value}
                        />
                      </div>
                    </Fragment>
                  )}
                </TriggerFormBlock>
              )}

              {step >= TRIGGER_FORM_STEPS.DESCRIPTION && (
                <Fragment>
                  <TriggerFormBlock
                    titleLabel='More options'
                    showDescription={false}
                    enabledHide
                    show={!isTelegramConnected || !isEmailConnected}
                    className={styles.chainBlock}
                  >
                    <TriggerFormChannels
                      channels={channels}
                      errors={errors}
                      isTelegramConnected={isTelegramConnected}
                      isEmailConnected={isEmailConnected}
                    />

                    <TriggerFormBlockDivider />

                    <TriggerFormFrequency
                      disabled={!isRepeating}
                      metaFormSettings={metaFormSettings}
                      setFieldValue={setFieldValue}
                      frequencyType={frequencyType}
                      metric={type.metric}
                      frequencyTimeType={frequencyTimeType}
                    />

                    <div
                      className={cx(
                        styles.row,
                        styles.rowTop,
                        styles.isRepeatingRow
                      )}
                    >
                      <div className={styles.isRepeating}>
                        <Checkbox
                          isActive={!isRepeating}
                          name='isRepeating'
                          onClick={() => {
                            setFieldValue('isRepeating', !isRepeating)
                          }}
                        />
                        <FormikLabel
                          text='Disable after it triggers'
                          className={styles.checkboxLabel}
                          onClick={() => {
                            setFieldValue('isRepeating', !isRepeating)
                          }}
                        />
                      </div>
                    </div>

                    <TriggerFormBlockDivider />

                    <div className={styles.row}>
                      <div className={styles.Field}>
                        <FormikLabel text='Signal visibility' />
                        <div className={styles.triggerToggleBlock}>
                          <RadioBtns
                            options={['Public', 'Private']}
                            labelOnRight
                            defaultSelectedIndex={
                              isPublic ? 'Public' : 'Private'
                            }
                            onSelect={toggleSignalPublic}
                            labelClassName={styles.checkboxLabel}
                          />
                        </div>
                      </div>
                    </div>
                  </TriggerFormBlock>

                  <div className={cx(styles.row, styles.descriptionBlock)}>
                    <div className={cx(styles.Field, styles.fieldFilled)}>
                      <FormikLabel text='Name of the signal' />
                      <FormikInput
                        name='title'
                        type='text'
                        minLength={MIN_TITLE_LENGTH}
                        maxLength={MAX_TITLE_LENGTH}
                        placeholder='Name of the signal'
                        onChange={() =>
                          setFieldValue('titleChangedByUser', true)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={cx(styles.Field, styles.fieldFilled)}>
                      <FormikLabel
                        text={`Description (${
                          (description || '').length
                        }/${MAX_DESCR_LENGTH})`}
                      />
                      <FormikTextarea
                        placeholder='Description of the signal'
                        name='description'
                        className={styles.descriptionTextarea}
                        rowsCount={3}
                        maxLength={MAX_DESCR_LENGTH}
                        onChange={() =>
                          setFieldValue('descriptionChangedByUser', true)
                        }
                      />
                    </div>
                  </div>
                </Fragment>
              )}

              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                isActive={isValid && !isSubmitting}
                variant={'fill'}
                accent='positive'
                className={styles.submitButton}
              >
                {id && !isShared ? 'Update signal' : 'Create signal'}
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
    isEmailConnected: selectIsEmailConnected(state),
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
