import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import { Input, Button } from '@santiment-network/ui'
import styles from './TriggerForm.module.scss'

const InfoSignalForm = ({
  title = 'Signal-' + new Date().toISOString(),
  description = '',
  isEdit = false,
  onInfoSignalSubmit,
  onBack
}) => {
  return (
    <Fragment>
      <Formik
        initialValues={{ title, description }}
        isInitialValid
        validate={values => {
          let errors = {}
          if (!values.title) {
            errors.title = 'Required'
          } else if (values.title.length < 3) {
            errors.title = 'Title has to be longer than 2 characters'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          onInfoSignalSubmit(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          isValid,
          ...rest
        }) => (
          <Form>
            <div className={styles.Field}>
              <label>Name of the signal</label>
              <Field
                id='title'
                name='title'
                type='text'
                placeholder='Name of signal'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                component={Input}
              />
              {errors.title && touched.title && errors.title}
            </div>
            <div className={styles.Field}>
              <label>Description</label>
              <Field
                id='description'
                component={Input}
                type='text'
                name='description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Description of the signal'
              />
            </div>
            <div className={styles.controls}>
              <Button
                type='button'
                variant={'flat'}
                accent='normal'
                border
                onClick={onBack}
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
    </Fragment>
  )
}

InfoSignalForm.propTypes = {
  onInfoSignalSubmit: PropTypes.func.isRequired
}

export default InfoSignalForm
