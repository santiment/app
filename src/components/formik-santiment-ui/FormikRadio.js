import React from 'react'
import cx from 'classnames'
import styles from './FormikRadio.module.scss'

const FormikRadio = ({ item, isSelected, onClick, classes = {} }) => {
  const { label } = item
  return (
    <div
      className={cx(
        styles.radio,
        classes.radioContainer,
        isSelected && styles.selected
      )}
      onClick={() => onClick(item)}
    >
      <div className={cx(styles.btn, classes.radio)} />
      <div className={styles.radioLabel}>{label}</div>
    </div>
  )
}

export default FormikRadio
