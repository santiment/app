import React, { useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import Button from '@santiment-network/ui/Button'
import StepTitle from '../StepTitle/StepTitle'
import BlockInput from './BlockInput/BlockInput'
import { getDescriptionStr } from '../../../../utils'
import styles from './NameAndDescription.module.scss'

const NameAndDescription = () => {
  const { submitForm, isSubmitting, values } = useFormikContext()
  const [titleField] = useField('title')
  const [descriptionField, , { setValue }] = useField('description')

  useEffect(() => {
    if (values.cooldown && !values.description) {
      setValue(
        getDescriptionStr({
          cooldown: values.cooldown,
          channels: values.settings.channel
        })
      )
    }
  }, [])

  function handleSubmit () {
    if (isSubmitting) {
      submitForm()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <StepTitle
          iconType='settings'
          title='Name & Description'
          className={styles.title}
        />
        <div>
          <BlockInput
            label='Alert name'
            {...titleField}
            blockClassname={styles.titleBlock}
          />
          <BlockInput
            label='Description'
            {...descriptionField}
            blockClassname={styles.descriptionBlock}
          />
        </div>
      </div>
      <Button
        type='submit'
        variant='fill'
        border={false}
        accent='positive'
        className={styles.submit}
        onClick={handleSubmit}
      >
        Create alert
      </Button>
    </div>
  )
}

export default NameAndDescription