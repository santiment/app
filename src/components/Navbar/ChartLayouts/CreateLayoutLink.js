import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import styles from './LayoutsEmptySection.module.scss'

const CreateLayoutLink = ({ className }) => (
  <Button
    as={Link}
    to='/charts'
    border
    className={cx(styles.createBtn, className)}
  >
    Create chart layout
  </Button>
)

export default CreateLayoutLink
