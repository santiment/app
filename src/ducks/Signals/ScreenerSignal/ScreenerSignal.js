import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import FormikEffect from '../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../components/formik-santiment-ui/FormikLabel'
import Button from '@santiment-network/ui/Button'
import { MAX_DESCR_LENGTH } from '../utils/constants'
import {
  validateTriggerForm,
  getNewDescription,
  mapTriggerToFormProps,
  mapFormPropsToTrigger
} from '../utils/utils'
import FormikTextarea from '../../../components/formik-santiment-ui/FormikTextarea'
import TriggerFormChannels from '../signalFormManager/signalCrudForm/formParts/channels/TriggerFormChannels'
import externalStyles from './../signalFormManager/signalCrudForm/signal/TriggerForm.module.scss'
import { mapTriggerStateToProps } from '../signalFormManager/signalCrudForm/signal/TriggerForm'

const getTitle = (formData, id) => {
  const isUpdate = id > 0
  const publicWord = formData.isPublic ? 'public' : 'private'
  if (isUpdate) {
    return `Update ${publicWord} alert`
  } else {
    return `Create ${publicWord} alert`
  }
}

export const SreenerSignal = ({
  stateSignal,
  stateSignal: { id, settings },
  isTelegramConnected = false,
  isEmailConnected = false,
  setTitle
}) => {
  const isNew = !id
  const [initialValues, setInitialValues] = useState(
    mapTriggerToFormProps(stateSignal)
  )

  useEffect(
    () => {
      setInitialValues(mapTriggerToFormProps(settings))
    },
    [stateSignal]
  )

  useEffect(
    () => {
      setTitle && setTitle(getTitle(initialValues, id))
    },
    [initialValues.isPublic]
  )

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid={!isNew}
      enableReinitialize
      validate={validateTriggerForm}
      onSubmit={values => {
        console.log(values)
        console.log(mapFormPropsToTrigger(values))
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

        return (
          <Form>
            <FormikEffect
              onChange={(current, prev) => {
                let { values: newValues } = current

                if (!isEqual(newValues, prev.values)) {
                  validateForm()

                  if (isNew) {
                    !newValues.descriptionChangedByUser &&
                      setFieldValue('description', getNewDescription(newValues))
                  }
                }
              }}
            />

            <div className={externalStyles.triggerFormItem}>
              <TriggerFormChannels
                isNew={isNew}
                channels={channels}
                errors={errors}
                isTelegramConnected={isTelegramConnected}
                isEmailConnected={isEmailConnected}
                setFieldValue={setFieldValue}
              />

              <div className={externalStyles.row}>
                <div
                  className={cx(
                    externalStyles.Field,
                    externalStyles.fieldFilled
                  )}
                >
                  <FormikLabel
                    text={`Description (${
                      (description || '').length
                    }/${MAX_DESCR_LENGTH})`}
                  />
                  <FormikTextarea
                    placeholder='Description of the alert'
                    name='description'
                    className={externalStyles.descriptionTextarea}
                    rowsCount={3}
                    maxLength={MAX_DESCR_LENGTH}
                    onChange={() =>
                      setFieldValue('descriptionChangedByUser', true)
                    }
                  />
                </div>
              </div>

              <Button
                type='submit'
                disabled={!isValidForm || isSubmitting}
                isActive={isValidForm && !isSubmitting}
                variant={'fill'}
                accent='positive'
                className={externalStyles.submitButton}
              >
                {id ? 'Update' : 'Create'}
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
