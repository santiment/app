import React, { useState, useEffect } from 'react'
import { compose } from 'recompose'
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
import styles from './ScreenerSignal.module.scss'

export const SreenerSignal = ({
  signal,
  isTelegramConnected = false,
  isEmailConnected = false,
  onCancel,
  onSubmit
}) => {
  const { id = 0 } = signal
  const isNew = id > 0
  const [initialValues, setInitialValues] = useState(
    mapTriggerToFormProps(signal)
  )

  useEffect(
    () => {
      setInitialValues(mapTriggerToFormProps(signal))
    },
    [signal]
  )

  console.log('initialValues', initialValues)

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={validateChannels}
      onSubmit={values => {
        onSubmit(mapFormPropsToScreenerTrigger(values))
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
        const { description, channels = [] } = values

        const isValidForm =
          isValid || !errors || Object.keys(errors).length === 0

        console.log('values', values)

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
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button
                type='submit'
                disabled={!isValidForm || isSubmitting}
                isActive={isValidForm && !isSubmitting}
                border
                variant='ghost'
                className={styles.submit}
              >
                {id ? 'Update' : 'Create'}
              </Button>
              <Button
                variant='ghost'
                disabled={isSubmitting}
                border
                className={styles.cancel}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

const enhance = compose(connect(mapTriggerStateToProps))

export default enhance(SreenerSignal)
