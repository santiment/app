import React, { useEffect } from 'react'

import NotificationsIcon from '../../../../components/Illustrations/NotificationsIcon'

import styles from './NameAndDescription.module.scss'

const NameAndDescription = ({
  handleFormValueChange,
  values,
  handleTitlesChange
}) => {
  useEffect(() => {
    handleTitlesChange()
  }, [])

  const onTextareaChange = fieldName => ({ currentTarget: { value } }) => {
    handleFormValueChange({
      field: fieldName,
      value: value
    })
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <NotificationsIcon className={styles.icon} />
          Notification & Privacy settings
        </div>
      </div>
      <div className={styles.cardWrapper}>
        <div className={styles.cardTitle}>Alert name</div>
        <textarea
          className={styles.textarea}
          onChange={onTextareaChange('title')}
          defaultValue={values.title || ''}
        />
      </div>
      <div className={styles.cardWrapper}>
        <div className={styles.cardTitle}>Description</div>
        <textarea
          className={styles.textarea}
          onChange={onTextareaChange('description')}
          defaultValue={values.description || ''}
        />
      </div>
    </>
  )
}

export default NameAndDescription
