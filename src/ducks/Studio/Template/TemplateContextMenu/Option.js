import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import styles from '../Dialog/LoadTemplate/Template.module.scss'

const Option = props => (
  <Button
    {...props}
    fluid
    variant='ghost'
    className={cx(styles.option, props.className)}
  />
)

export default Option
