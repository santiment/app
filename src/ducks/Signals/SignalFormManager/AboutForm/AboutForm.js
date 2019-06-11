import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Formik, Form } from 'formik'
import { Button } from '@santiment-network/ui'
import FormikInput from '../../../../components/formik-santiment-ui/FormikInput'
import styles from '../SignalCrudForm/Signal/TriggerForm.module.scss'

const AboutForm = ({ triggerMeta, isEdit = false, onSubmit, onBack }) => {
  const [trigger, setTrigger] = useState(triggerMeta)
  return (
    <Formik
      initialValues={trigger}
      isInitialValid
      validate={values => {
        let errors = {}
        if (!values.title) {
          errors.title = 'Required'
        } else if (values.title.length < 3) {
          errors.title = 'Title has to be longer than 2 characters'
        } else if (values.title.length > 120) {
          errors.title = 'Title has to be less than 120 characters'
        }
        if (values.description.length > 240) {
          errors.description = 'Description has to be less than 240 characters'
        }
        return errors
      }}
      onSubmit={values => {
        onSubmit(values)
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={styles.AboutForm}>
          <div className={styles.Field}>
            <label>Name of the signal</label>
            <FormikInput
              name='title'
              type='text'
              placeholder='Name of the signal'
              onChange={value =>
                setTrigger({
                  ...trigger,
                  title: value
                })
              }
            />
          </div>
          <div className={styles.Field}>
            <label>Description</label>
            <FormikInput
              name='description'
              type='text'
              placeholder='Description of the signal'
              onChange={value => {
                setTrigger({
                  ...trigger,
                  description: value
                })
              }}
            />
          </div>
          <div className={styles.controls}>
            <Button
              type='button'
              variant={'flat'}
              accent='grey'
              border
              onClick={() => {
                onBack(trigger)
              }}
            >
              Back
            </Button>
            <Button
              type='submit'
              disabled={!isValid || isSubmitting}
              isActive={isValid && !isSubmitting}
              variant={'fill'}
              accent='positive'
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

AboutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default AboutForm
