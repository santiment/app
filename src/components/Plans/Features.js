import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './Features.module.scss'

export default ({ data, classes = {} }) => (
  <ul className={cx(styles.features, classes.features)}>
    {data.map((feature, i) => (
      <li key={i} className={cx(styles.feature, classes.feature)}>
        <Icon
          type='checkmark'
          className={cx(styles.feature__icon, classes.feature__icon)}
        />
        {feature}
      </li>
    ))}
  </ul>
)
