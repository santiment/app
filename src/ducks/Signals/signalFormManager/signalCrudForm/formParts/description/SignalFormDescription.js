import React from 'react'
import cx from 'classnames'
import FormikLabel from '../../../../../../components/formik-santiment-ui/FormikLabel'
import { MAX_DESCR_LENGTH } from '../../../../utils/constants'
import FormikTextarea from '../../../../../../components/formik-santiment-ui/FormikTextarea'
import styles from '../../signal/TriggerForm.module.scss'

const SignalFormDescription = ({ setFieldValue, description, className }) => {
  return (
    <>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <FormikLabel
          text={`Description (${
            (description || '').length
          }/${MAX_DESCR_LENGTH})`}
        />
        <FormikTextarea
          placeholder='Description of the alert'
          name='description'
          className={cx(styles.descriptionTextarea, className)}
          rowsCount={3}
          maxLength={MAX_DESCR_LENGTH}
          onChange={() => setFieldValue('descriptionChangedByUser', true)}
        />
      </div>
    </>
  )
}

export default SignalFormDescription
