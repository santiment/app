import React, { useState, useEffect, useCallback } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import FormikEffect from '../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../components/formik-santiment-ui/FormikLabel'
import Button from '@santiment-network/ui/Button'
import {
  mapFormPropsToScreenerTrigger,
  mapTriggerToFormProps,
  validateChannels
} from '../utils/utils'
import TriggerFormChannels from '../signalFormManager/signalCrudForm/formParts/channels/TriggerFormChannels'
import externalStyles from './../signalFormManager/signalCrudForm/signal/TriggerForm.module.scss'
import { mapTriggerStateToProps } from '../signalFormManager/signalCrudForm/signal/TriggerForm'
import SignalFormDescription from '../signalFormManager/signalCrudForm/formParts/description/SignalFormDescription'
import { TriggerFormBlockDivider } from '../signalFormManager/signalCrudForm/formParts/block/TriggerFormBlock'
import AlertWeeklyReports from '../signalFormManager/signalCrudForm/formParts/weeklyReports/AlertWeeklyReports'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './ScreenerSignal.module.scss'

export const SreenerSignal = ({
  signal,
  watchlist,
  isTelegramConnected = false,
  isEmailConnected = false,
  onCancel,
  onSubmit
}) => {
  const { id = 0 } = signal
  const isNew = !(id > 0)
  const [initialValues, setInitialValues] = useState(
    mapTriggerToFormProps(signal)
  )

  useEffect(
    () => {
      setInitialValues(mapTriggerToFormProps(signal))
    },
    [signal]
  )

  const toggleSignalActive = useCallback(
    values => {
      const newValues = { ...values, isActive: !values.isActive }
      setInitialValues(newValues)
    },
    [setInitialValues]
  )

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={validateChannels}
      onSubmit={formProps => {
        onSubmit(mapFormPropsToScreenerTrigger({ formProps, signal }))
      }}
    >
      {({
        values,
        errors,
        isSubmitting,
        setFieldValue,
        isValid,
        validateForm
      }) => {
        const { description, channels = [], isActive } = values

        const isValidForm =
          isValid || !errors || Object.keys(errors).length === 0

        return (
          <Form className={styles.form}>
            <FormikEffect
              onChange={(current, prev) => {
                let { values: newValues } = current

                if (!isEqual(newValues, prev.values)) {
                  validateForm()
                }
              }}
            />

            <div className={styles.block}>
              <FormikLabel text='Notify me via' />

              <TriggerFormChannels
                isNew={isNew}
                channels={channels}
                errors={errors}
                isTelegramConnected={isTelegramConnected}
                isEmailConnected={isEmailConnected}
                setFieldValue={setFieldValue}
              />
            </div>

            <TriggerFormBlockDivider className={styles.divider} />

            <div className={styles.block}>
              <div className={externalStyles.row}>
                <SignalFormDescription
                  description={description}
                  setFieldValue={setFieldValue}
                  className={styles.textarea}
                />
              </div>
            </div>

            <div className={styles.reports}>
              <AlertWeeklyReports watchlist={watchlist} />
            </div>

            <div className={styles.actions}>
              <Button
                type='submit'
                disabled={!isValidForm || isSubmitting}
                variant='fill'
                accent='positive'
                className={styles.submit}
              >
                {id ? 'Save changes' : 'Create'}
              </Button>
              <Button
                disabled={isSubmitting}
                border
                className={styles.cancel}
                onClick={onCancel}
              >
                Cancel
              </Button>

              <div className={styles.toggleContainer}>
                {isActive ? 'Enabled' : 'Disabled'}
                <Toggle
                  isActive={isActive}
                  className={styles.toggle}
                  onClick={() => toggleSignalActive(values)}
                />
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

const mapStateToProps = state => mapTriggerStateToProps(state)

export default connect(mapStateToProps)(SreenerSignal)
