import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Row } from '../Section/index'
import styles from './index.module.scss'

const Accordion = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Row className={cx(styles.wrapper, isOpened && styles.wrapper_opened)}>
      <Row className={styles.header} onClick={() => setIsOpened(!isOpened)}>
        {title}
        <Icon type='arrow-down-big' className={styles.toggle} />
      </Row>
      {isOpened && <div className={styles.content}>{children}</div>}
    </Row>
  )
}

export default Accordion
