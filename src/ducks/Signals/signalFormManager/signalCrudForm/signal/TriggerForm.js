import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'recompose'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import {
  isTelegramConnectedAndEnabled,
  selectIsEmailConnected
} from '../../../../../pages/UserSelectors'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import Button from '@santiment-network/ui/Button'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import {
  METRIC_TO_TYPES,
  MAX_DESCR_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  TRIGGER_FORM_STEPS,
  COMMON_PROPS_FOR_METRIC
} from '../../../utils/constants'
import {
  couldShowChart,
  mapFormPropsToTrigger,
  validateTriggerForm,
  getDefaultFormValues,
  titleMetricValuesHeader,
  getNewTitle,
  getNewDescription
} from '../../../utils/utils'
import { TriggerFormMetricValues } from '../formParts/TriggerFormMetricValues'
import { TriggerFormMetricTypes } from '../formParts/metricTypes/TriggerFormMetricTypes'
import { TriggerFormFrequency } from '../formParts/TriggerFormFrequency'
import SignalPreview from '../../../chart/preview/SignalPreview'
import TriggerMetricTypesResolver from '../formParts/TriggerMetricTypesResolver'
import TriggerFormBlock, {
  TriggerFormBlockDivider
} from '../formParts/block/TriggerFormBlock'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikTextarea from '../../../../../components/formik-santiment-ui/FormikTextarea'
import TriggerFormChannels from '../formParts/channels/TriggerFormChannels'
import FormikCheckbox from '../../../../../components/formik-santiment-ui/FormikCheckbox'
import styles from './TriggerForm.module.scss'

const getTitle = (formData, id, isShared) => {
  const isUpdate = id > 0 && !isShared
  const publicWord = formData.isPublic ? 'public' : 'private'
  if (isUpdate) {
    return `Update ${publicWord} signal`
  } else {
    return `Create ${publicWord} signal`
  }
}

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  isTelegramConnected: PropTypes.bool.isRequired,
  lastPriceItem: PropTypes.any,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any
}

export const TriggerForm = ({
  id,
  onSettingsChange,
  isTelegramConnected = false,
  isEmailConnected = false,
  lastPriceItem,
  settings = {},
  metaFormSettings,
  formChangedCallback,
  isShared,
  setTitle
}) => {
  const isNew = !id
  const [initialValues, setInitialValues] = useState(settings)
  const [canCallFormChangCallback, setCanCallFormChanged] = useState(false)
  const [step, setStep] = useState(TRIGGER_FORM_STEPS.DESCRIPTION)

  useEffect(
    () => {
      if (!isNew && !isEqual(settings, initialValues)) {
        setInitialValues(settings)
      }
    },
    [settings]
  )

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

  useEffect(
    () => {
      setTitle && setTitle(getTitle(initialValues, id, isShared))
    },
    [initialValues.isPublic]
  )

  const toggleSignalPublic = values => {
    const newValues = { ...values, isPublic: !values.isPublic }
    setInitialValues(newValues)
  }

  const validateAndSetStep = newStep => {
    if (isNew) {
      newStep > step && setStep(newStep)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid={!isNew}
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
          channels = []
        } = values

        const { price } = lastPriceItem || {}
        const mappedTrigger = mapFormPropsToTrigger(values)

        const showChart = target && couldShowChart(mappedTrigger.settings)

        const typeSelectors = metric.key
          ? COMMON_PROPS_FOR_METRIC
          : METRIC_TO_TYPES[metric.value]

        const showTypes =
          metric && !metric.hidden && typeSelectors && typeSelectors.length > 1

        const { dependencies: metricValueBlocks } = type

        const showValues = showTypes || showChart || metricValueBlocks

        if (!showValues && step === TRIGGER_FORM_STEPS.VALUES) {
          validateAndSetStep(TRIGGER_FORM_STEPS.DESCRIPTION)
        }

        const isValidForm =
          isValid || !errors || Object.keys(errors).length === 0

        return (
          <Form>
            <FormikEffect
              onChange={(current, prev) => {
                let { values: newValues } = current

                if (!isEqual(newValues, prev.values)) {
                  const changedMetric =
                    !prev.values.metric ||
                    newValues.metric.value !== prev.values.metric.value ||
                    newValues.type.value !== prev.values.type.value

                  if (changedMetric) {
                    setInitialValues(
                      getDefaultFormValues(newValues, prev.values.metric)
                    )
                  }

                  validateForm()

                  if (isNew && !isShared) {
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
                    <>
                      {(showTypes || metricValueBlocks) && (
                        <TriggerFormBlockDivider />
                      )}
                      <div className={styles.preview}>
                        <SignalPreview
                          trigger={mappedTrigger}
                          type={metric.value}
                        />
                      </div>
                    </>
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
                      isNew={isNew}
                      channels={channels}
                      errors={errors}
                      isTelegramConnected={isTelegramConnected}
                      isEmailConnected={isEmailConnected}
                      setFieldValue={setFieldValue}
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
                      <FormikCheckbox
                        className={styles.isRepeating}
                        name='isRepeating'
                        isActive={!isRepeating}
                        label='Disable after it triggers'
                        onClick={() => {
                          setFieldValue('isRepeating', !isRepeating)
                        }}
                      />
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
                            onSelect={() => toggleSignalPublic(values)}
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
                disabled={!isValidForm || isSubmitting}
                isActive={isValidForm && !isSubmitting}
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
    isTelegramConnected: isTelegramConnectedAndEnabled(state),
    isEmailConnected: selectIsEmailConnected(state),
    lastPriceItem: state.signals.points
      ? state.signals.points[state.signals.points.length - 1]
      : undefined
  }
}

const enhance = compose(connect(mapStateToProps))

export default enhance(TriggerForm)
