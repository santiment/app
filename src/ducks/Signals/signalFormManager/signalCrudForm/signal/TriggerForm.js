import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
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
import FormikCheckboxes from '../../../../../components/formik-santiment-ui/FormikCheckboxes'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import Button from '@santiment-network/ui/Button'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import { Checkbox } from '@santiment-network/ui'
import Message from '@santiment-network/ui/Message'
import {
  PRICE_PERCENT_CHANGE,
  METRIC_DEFAULT_VALUES,
  DEFAULT_FORM_META_SETTINGS,
  METRIC_TO_TYPES,
  MAX_DESCR_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  METRIC_TYPES_DEPENDENCIES,
  TRIGGER_FORM_STEPS
} from '../../../utils/constants'
import {
  couldShowChart,
  mapFormPropsToTrigger,
  mapTargetObject,
  validateTriggerForm,
  getDefaultFormValues,
  titleMetricValuesHeader,
  getFormMetricValue,
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
import SidecarExplanationTooltip from '../../../../SANCharts/SidecarExplanationTooltip'
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
  isEmailConnected = false,
  lastPriceItem,
  settings,
  metaFormSettings,
  id
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
    couldShowChart(initialValues) && getSignalBacktestingPoints(initialValues)
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

        const metricValueBlocks =
          METRIC_TYPES_DEPENDENCIES[getFormMetricValue(type)]

        const showValues = showTypes || showChart || metricValueBlocks

        if (!showValues && step === TRIGGER_FORM_STEPS.VALUES) {
          validateAndSetStep(TRIGGER_FORM_STEPS.DESCRIPTION)
        }

        const notConnectedTelegram =
          channels.find(c => c === 'Telegram') && !isTelegramConnected
        const notConnectedEmail =
          channels.find(c => c === 'Email') && !isEmailConnected

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

                  if (!id || changedMetric) {
                    !newValues.titleChangedByUser &&
                      setFieldValue('title', getNewTitle(newValues))
                    !newValues.descriptionChangedByUser &&
                      setFieldValue('description', getNewDescription(newValues))
                  }
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
                    <SidecarExplanationTooltip
                      closeTimeout={500}
                      localStorageSuffix='_TRIGGER_FORM_EXPLANATION'
                      position='top'
                      title='Connect channels'
                      description='Get fast notifications through Email or Telegram'
                      className={styles.explanation}
                    >
                      <div className={cx(styles.row, styles.rowTop)}>
                        <div className={cx(styles.Field, styles.fieldFilled)}>
                          <FormikLabel text='Notify me via' />
                          <div className={styles.notifyBlock}>
                            <FormikCheckboxes
                              name='channels'
                              labelOnRight
                              options={['Email', 'Telegram']}
                            />
                            {(notConnectedTelegram || notConnectedEmail) && (
                              <Button
                                className={styles.connectLink}
                                variant='ghost'
                                as={Link}
                                to='/account'
                              >
                                <span className={styles.connectLink}>
                                  Connect
                                </span>
                              </Button>
                            )}
                          </div>
                          {errors.channels && (
                            <div className={cx(styles.row, styles.messages)}>
                              <Message variant='warn'>
                                {errors.channels}
                              </Message>
                            </div>
                          )}
                        </div>
                      </div>
                    </SidecarExplanationTooltip>

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
                          Disable after it triggers
                        </span>
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
                            style={{ marginRight: '20px' }}
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
                        rowsCount={2}
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
                {id ? 'Update signal' : 'Create signal'}
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
