import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import styles from './index.module.scss'

export default props => (
  <Dialog {...props}>
    <div className={styles.wrapper}>
      <p>Please, log in to use this feature</p>
      <Button
        variant='fill'
        accent='positive'
        fluid
        as={Link}
        to='/login'
        className={styles.btn}
      >
        Log in
      </Button>
    </div>
  </Dialog>
)
