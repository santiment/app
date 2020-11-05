import React from 'react'
import cx from 'classnames'
import styles from './Features.module.scss'

const MarkIcon = ({ className }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.25 8.0004C1.25 4.27226 4.27226 1.25 8.0004 1.25C11.7285 1.25 14.7508 4.27226 14.7508 8.0004C14.7508 11.7285 11.7285 14.7508 8.0004 14.7508C4.27226 14.7508 1.25 11.7285 1.25 8.0004ZM8.0004 0.25C3.71997 0.25 0.25 3.71997 0.25 8.0004C0.25 12.2808 3.71997 15.7508 8.0004 15.7508C12.2808 15.7508 15.7508 12.2808 15.7508 8.0004C15.7508 3.71997 12.2808 0.25 8.0004 0.25ZM11.6135 6.24727C11.7975 6.04139 11.7798 5.7253 11.5739 5.54128C11.368 5.35725 11.0519 5.37497 10.8679 5.58086L7.33399 9.5346L5.65662 7.75551C5.46719 7.55459 5.15074 7.54527 4.94982 7.73471C4.7489 7.92414 4.73958 8.24059 4.92902 8.44151L6.98001 10.6169C7.07607 10.7188 7.21045 10.7757 7.35046 10.7738C7.49047 10.772 7.62329 10.7115 7.71661 10.6071L11.6135 6.24727Z'
    />
  </svg>
)

export default ({ isGreen, data, classes = {} }) => (
  <ul className={cx(styles.features, classes.features)}>
    {data.map((feature, i) => (
      <li key={i} className={cx(styles.feature, classes.feature)}>
        <MarkIcon
          className={cx(
            styles.feature__icon,
            isGreen && styles.feature__icon__green,
            classes.feature__icon
          )}
        />
        <div className={styles.feature__text}>{feature}</div>
      </li>
    ))}
  </ul>
)
