import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './index.module.scss'

const EMPTY_ARRAY = []

const ProPopup = ({ title, description, features, isOpen = false, ...props }) => {
  return (
    <Dialog size='m' title={title} open={isOpen} classes={styles} {...props}>
      <div className={styles.container}>
        <div className={styles.description}>{description}</div>
        <div className={styles.features}>
          {features.map((item, idx) => (
            <div className={styles.feature} key={idx}>
              {item}
            </div>
          ))}
        </div>
        <Button
          as={Link}
          to='/pricing'
          variant='fill'
          accent='orange'
          className={styles.btn}
          onClick={props.onClose}
        >
          Go Pro
        </Button>
      </div>
    </Dialog>
  )
}

ProPopup.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.array,
}

ProPopup.defaultProps = {
  title: '',
  description: '',
  features: EMPTY_ARRAY,
}

export default ProPopup
