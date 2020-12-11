import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Section, Container, Row } from '../index'
import styles from './index.module.scss'

const Insight = ({ title }) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Row
      className={cx(styles.insight, isOpened && styles.insight_opened)}
      onClick={() => setIsOpened(!isOpened)}
    >
      <Row className={styles.header}>
        {title}
        <Icon type='arrow-down-big' className={styles.toggle} />
      </Row>
      <div className={styles.body}>body</div>
    </Row>
  )
}

const InsightsOnDemand = ({ ...props }) => {
  return (
    <Section title='Insights on demand'>
      <Container>
        <Insight title='Does big holders of BTC accumulating now?' />
        <Insight title='Does big holders of BTC accumulating now?' />
      </Container>
    </Section>
  )
}

export default InsightsOnDemand
