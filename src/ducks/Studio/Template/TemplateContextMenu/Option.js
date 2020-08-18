import React from 'react'
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
