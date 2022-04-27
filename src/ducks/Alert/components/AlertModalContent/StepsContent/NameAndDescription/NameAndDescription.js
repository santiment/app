import React from 'react'
import { useField } from 'formik'
import StepTitle from '../StepTitle/StepTitle'
import BlockInput from './BlockInput/BlockInput'
import { clipText } from '../../../../utils'
import styles from './NameAndDescription.module.scss'

const NameAndDescription = () => {
  const [titleField] = useField('title')
  const [descriptionField] = useField('description')

  return (
    <div className={styles.wrapper}>
      <div>
        <StepTitle title='Name & Description' className={styles.title} />
        <div>
          <BlockInput
            label='Alert name'
            {...titleField}
            value={clipText(titleField.value, 70)}
            blockClassname={styles.titleBlock}
          />
          <BlockInput
            label='Description'
            {...descriptionField}
            blockClassname={styles.descriptionBlock}
          />
        </div>
      </div>
    </div>
  )
}

export default NameAndDescription
