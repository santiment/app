import React, { useState, useEffect, Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Formik, Form } from 'formik'
import isEqual from 'lodash.isequal'
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import Button from '@santiment-network/ui/Button'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import {
  METRIC_TO_TYPES,
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
import TriggerFormMetricTypes from '../formParts/metricTypes/TriggerFormMetricTypes'
import { TriggerFormFrequency } from '../formParts/TriggerFormFrequency'
import SignalPreview from '../../../chart/preview/SignalPreview'
import TriggerMetricTypesResolver from '../formParts/TriggerMetricTypesResolver'
import TriggerFormBlock, {
  TriggerFormBlockDivider
} from '../formParts/block/TriggerFormBlock'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import TriggerFormChannels from '../formParts/channels/TriggerFormChannels'
import FormikCheckbox from '../../../../../components/formik-santiment-ui/FormikCheckbox'
import SignalFormDescription from '../formParts/description/SignalFormDescription'
import { useUserSettings } from '../../../../../stores/user/settings'
import styles from './TriggerForm.module.scss'

const getTitle = (formData, id, isShared) => {
  const isUpdate = id > 0 && !isShared
  const publicWord = formData.isPublic ? 'public' : 'private'
  if (isUpdate) {
    return `Update ${publicWord} alert`
  } else {
    return `Create ${publicWord} alert`
  }
}

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any
}

export const TriggerForm = ({
  id,
  onSettingsChange,
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

  const toggleSignalPublic = useCallback(
    values => {
      const newValues = { ...values, isPublic: !values.isPublic }
      setInitialValues(newValues)
    },
    [setInitialValues]
  )

  const validateAndSetStep = useCallback(
    newStep => {
      if (isNew) {
        newStep > step && setStep(newStep)
      }
    },
    [isNew, step, setStep]
  )

  const {
    settings: { isTelegramAllowAlerts, isEmailAllowAlerts }
  } = useUserSettings()

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
          targetWatchlist,
          frequencyType,
          frequencyTimeType,
          isRepeating,
          ethAddress,
          isPublic,
          description,
          channels = []
        } = values

        const mappedTrigger = mapFormPropsToTrigger(values)

        const showChart =
          (target || targetWatchlist) && couldShowChart(mappedTrigger.settings)

        const typeSelectors = metric.key
          ? COMMON_PROPS_FOR_METRIC
          : METRIC_TO_TYPES[metric.value]

        const showTypes = typeSelectors && typeSelectors.length > 1

        const { dependencies: metricValueBlocks } = type

        const showValues = showTypes || showChart || metricValueBlocks

        if (!showValues && step === TRIGGER_FORM_STEPS.VALUES) {
          validateAndSetStep(TRIGGER_FORM_STEPS.DESCRIPTION)
        }

        const isValidForm =
          isValid && (!errors || Object.keys(errors).length === 0)

        const showDivider = showTypes || metricValueBlocks

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
                  trigger={mappedTrigger}
                />
              )}

              {step >= TRIGGER_FORM_STEPS.TYPES && (
                <TriggerMetricTypesResolver
                  address={ethAddress}
                  values={values}
                  metaFormSettings={metaFormSettings}
                  setFieldValue={setFieldValue}
                  isNewSignal={isNew}
                />
              )}

              {step >= TRIGGER_FORM_STEPS.VALUES && showValues && (
                <TriggerFormBlock
                  {...titleMetricValuesHeader(!!metricValueBlocks, values)}
                  className={styles.chainBlock}
                >
                  {showDivider && (
                    <TriggerFormMetricValues
                      typeSelectors={typeSelectors}
                      metaFormSettings={metaFormSettings}
                      blocks={metricValueBlocks}
                      values={values}
                      showTypes={showTypes}
                    />
                  )}

                  {showChart && (
                    <>
                      {showDivider && <TriggerFormBlockDivider />}
                      <div
                        className={cx(
                          styles.preview,
                          showDivider && styles.previewWithDiviver
                        )}
                      >
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
                    show={!isTelegramAllowAlerts || !isEmailAllowAlerts}
                    className={styles.chainBlock}
                  >
                    <TriggerFormChannels
                      isNew={isNew}
                      channels={channels}
                      errors={errors}
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

                    <div className={cx(styles.row, styles.rowTop)}>
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
                      <FormikLabel text='Name of the alert' />
                      <FormikInput
                        name='title'
                        type='text'
                        minLength={MIN_TITLE_LENGTH}
                        maxLength={MAX_TITLE_LENGTH}
                        placeholder='Name of the alert'
                        onChange={() =>
                          setFieldValue('titleChangedByUser', true)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <SignalFormDescription
                      setFieldValue={setFieldValue}
                      description={description}
                    />
                  </div>
                </Fragment>
              )}

              <Button
                type='submit'
                disabled={!isValidForm}
                isActive={isValidForm}
                variant={'fill'}
                accent='positive'
                className={styles.submitButton}
              >
                {id && !isShared ? 'Update alert' : 'Create alert'}
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

TriggerForm.propTypes = propTypes

export default TriggerForm
