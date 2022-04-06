import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import AlertMessage from '../../../../../../../components/Alert/AlertMessage'
import { clipText } from '../../../../../utils'
import styles from './Title.module.scss'

const Title = ({ description, invalidStepsMemo, selected, isFinished }) => {
  const { values } = useFormikContext()
  const { title } = values

  const isInvalid = invalidStepsMemo.has('title')

  useEffect(() => {
    if (title && isInvalid) {
      invalidStepsMemo.delete('title')
    }
  }, [title, isInvalid])

  let children = ''

  if (!title) {
    children = description || ''
  } else {
    children = clipText(title, 40)
  }

  return (
    <div className={styles.wrapper}>
      {(selected || isFinished) && children}
      {isInvalid && <AlertMessage className={styles.error} error text='Title is required' />}
    </div>
  )
}

export default Title
