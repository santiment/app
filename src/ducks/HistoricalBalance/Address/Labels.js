import React from 'react'
import cx from 'classnames'
import { useAddressLabels } from '../hooks'
import styles from './Labels.module.scss'

const Label = ({ name, origin }) => (
  <div
    key={name}
    className={cx(styles.label, origin === 'santiment' && styles.san)}
  >
    {name}
  </div>
)

const Labels = ({ settings }) => (
  <div className={styles.wrapper}>{useAddressLabels(settings).map(Label)}</div>
)

export default Labels
