import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import Button from '@santiment-network/ui/Button'
import FormikInput from '../../../../components/formik-santiment-ui/FormikInput'
import FormikLabel from '../../../../components/formik-santiment-ui/FormikLabel'
import FormikTextarea from '../../../../components/formik-santiment-ui/FormikTextarea'
import styles from '../signalCrudForm/signal/TriggerForm.module.scss'

const MAX_DESCR_LENGTH = 140
const MAX_TITLE_LENGTH = 120
const MIN_TITLE_LENGTH = 2

const AboutForm = ({ triggerMeta, onSubmit, onBack, isShared }) => {
  const [trigger, setTrigger] = useState(triggerMeta)

  useEffect(
    () => {
      setTrigger(triggerMeta)
    },
    [triggerMeta]
  )

  return (
    <Formik
      initialValues={trigger}
      isInitialValid
      enableReinitialize
      validate={values => {
        let errors = {}
        if (!values.title) {
          errors.title = 'Required'
        } else if (values.title.length <= MIN_TITLE_LENGTH) {
          errors.title = `Title has to be longer than ${MIN_TITLE_LENGTH} characters`
        } else if (values.title.length > MAX_TITLE_LENGTH) {
          errors.title = `Title has to be less than ${MAX_TITLE_LENGTH} characters`
        }
        if (
          !values.description ||
          values.description.length > MAX_DESCR_LENGTH
        ) {
          errors.description = `Description has to be less than ${MAX_DESCR_LENGTH} characters`
        }
        return errors
      }}
      onSubmit={values => {
        onSubmit(values)
      }}
    >
      {({ values: { description = '' }, isSubmitting, isValid }) => (
        <Form className={styles.AboutForm}>
          <div className={styles.triggerFormItem}>
            <div className={styles.row}>
              <div className={styles.Field}>
                <FormikLabel text='Name of the signal' />
                <FormikInput
                  name='title'
                  type='text'
                  minLength={MIN_TITLE_LENGTH}
                  maxLength={MAX_TITLE_LENGTH}
                  placeholder='Name of the signal'
                  onChange={value =>
                    setTrigger({
                      ...trigger,
                      title: value
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.Field}>
                <FormikLabel
                  text={`Description (${
                    (description || '').length
                  }/${MAX_DESCR_LENGTH})`}
                />
                <FormikTextarea
                  placeholder='Description of the signal'
                  name='description'
                  rowsCount={3}
                  maxLength={MAX_DESCR_LENGTH}
                  onChange={value => {
                    setTrigger({
                      ...trigger,
                      description: value
                    })
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.controls}>
            <Button
              type='button'
              variant={'flat'}
              accent='grey'
              border
              onClick={() => onBack(trigger)}
            >
              Back
            </Button>
            <Button
              type='submit'
              disabled={!isValid || isSubmitting}
              isActive={isValid && !isSubmitting}
              variant='fill'
              accent='positive'
            >
              {isShared ? 'Save' : 'Confirm'}
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
