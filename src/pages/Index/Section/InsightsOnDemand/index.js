import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { insights } from './insights'
import { Section, Container, Row } from '../index'
import styles from './index.module.scss'

const Insight = ({ insight }) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Row className={cx(styles.insight, isOpened && styles.insight_opened)}>
      <Row className={styles.header} onClick={() => setIsOpened(!isOpened)}>
        {insight.title}
        <Icon type='arrow-down-big' className={styles.toggle} />
      </Row>
      {isOpened && <div className={styles.body}>{insight.body()}</div>}
    </Row>
  )
}

const InsightsOnDemand = ({ ...props }) => {
  return (
    <Section title='Insights on demand'>
      <Container>
        {insights.map(insight => (
          <Insight key={insight.title} insight={insight} />
        ))}
      </Container>
    </Section>
  )
}

export default InsightsOnDemand
