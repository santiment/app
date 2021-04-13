import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Row } from '../Section/index'
import styles from './index.module.scss'

const Accordion = ({
  title,
  children,
  isOpenedDefault = false,
  classes = {},
  showArrow = true
}) => {
  const [isOpened, setIsOpened] = useState(isOpenedDefault)

  return (
    <Row className={cx(styles.wrapper, isOpened && styles.wrapper_opened)}>
      <Row
        className={cx(styles.header, classes.accordionTitle)}
        onClick={() => setIsOpened(!isOpened)}
      >
        {title}
        {showArrow && <Icon type='arrow-down-big' className={styles.toggle} />}
      </Row>
      {isOpened && (
        <div className={cx(styles.content, classes.accordionContent)}>
          {children}
        </div>
      )}
    </Row>
  )
}

export default Accordion
