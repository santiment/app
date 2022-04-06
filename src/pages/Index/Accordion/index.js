import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Row } from '../Section/index'
import AccordionContent from '../../../components/AccordionContent'
import styles from './index.module.scss'

const OBJ = {}

const Accordion = ({
  title,
  children,
  isOpenedDefault = false,
  classes = OBJ,
  animateOnMount,
  showArrow = true,
}) => {
  const [isOpened, setIsOpened] = useState(isOpenedDefault)

  function toggleOpen() {
    setIsOpened(!isOpened)
  }

  return (
    <Row className={cx(styles.wrapper, isOpened && styles.wrapper_opened)}>
      <Row className={cx(styles.header, classes.accordionTitle)} onClick={toggleOpen}>
        {title}
        {showArrow && <Icon type='arrow-down-big' className={styles.toggle} />}
      </Row>
      <AccordionContent show={isOpened} animateOnMount={animateOnMount}>
        <div className={cx(styles.content, classes.accordionContent)}>{children}</div>
      </AccordionContent>
    </Row>
  )
}

export default Accordion
