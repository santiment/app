import React, { useState, useEffect, useCallback } from 'react'
import { Formik } from 'formik'
import {
  mapFormPropsToScreenerTrigger,
  mapTriggerToFormProps,
  validateChannels
} from '../utils/utils'
import ScreenerAlertForm from './ScreenerAlertForm'

export const SreenerSignal = ({ signal, watchlist, onCancel, onSubmit }) => {
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
      {props => (
        <ScreenerAlertForm
          toggleSignalActive={toggleSignalActive}
          watchlist={watchlist}
          onCancel={onCancel}
          isNew={isNew}
          form={props}
          setInitialValues={setInitialValues}
        />
      )}
    </Formik>
  )
}

export default SreenerSignal
