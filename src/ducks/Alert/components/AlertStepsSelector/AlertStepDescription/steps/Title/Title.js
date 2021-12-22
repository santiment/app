import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import { clipText } from '../../../../../utils'
import styles from './Title.module.scss'

const Title = ({ description, isSmall }) => {
  const { values } = useFormikContext()
  const { title } = values

  if (!title) {
    return description || ''
  }

  return (
    <div className={cx(styles.wrapper, isSmall && styles.small)}>
      {clipText(title, 60)}
    </div>
  )
}

export default Title
