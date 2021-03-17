import React from 'react'
import AutoresizeTextarea from '../../components/AutoresizeTextarea'
import styles from './index.module.scss'

const Note = ({ notes }) => {
  return (
    <div className={styles.note}>
      <AutoresizeTextarea
        defaultValue={notes || ''}
        placeholder='Add note'
        maxLength={45}
      />
    </div>
  )
}

export default Note
