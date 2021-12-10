import React from 'react'
import styles from './AlertStepDescription.module.scss'

const DESCRIPTION_TYPES = {
  TITLE: 'title'
}

function checkValueByType (values, type) {
  switch (type) {
    case 'Check name and description':
    case 'Name & Description':
      return {
        value: values.title,
        type: DESCRIPTION_TYPES.TITLE
      }
    default:
      return {}
  }
}

function AlertStepDescription ({ description, size, type, values }) {
  const valueDescription = checkValueByType(values, type)

  if (!valueDescription.value) {
    return description || ''
  }

  if (size === 'small') {
    switch (valueDescription.type) {
      default:
        return ''
    }
  }

  switch (valueDescription.type) {
    case DESCRIPTION_TYPES.TITLE:
      return <div className={styles.wrapper}>{valueDescription.value}</div>
    default:
      return ''
  }
}

export default AlertStepDescription
