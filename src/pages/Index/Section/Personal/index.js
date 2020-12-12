import React, { useState } from 'react'
import StartGuide from './StartGuide'
import Cabinet from './Cabinet'
import { Section, Container, Row } from '../index'
import { Tab } from '../Trends'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import styles from './index.module.scss'

const TabType = {
  START_GUIDE: 'Quick Start Guide',
  CABINET: 'Cabinet'
}
const TabTypeComponent = {
  [TabType.START_GUIDE]: StartGuide,
  [TabType.CABINET]: Cabinet
}

const toggleVisibility = tab => (tab ? null : TabType.START_GUIDE)

const Header = ({ tabState }) => (
  <Row className={styles.header}>
    <Tab tab={TabType.START_GUIDE} tabState={tabState} />
    <Tab tab={TabType.CABINET} tabState={tabState} className={styles.cabinet} />
    <Toggle
      className={styles.toggle}
      isActive={tabState[0]}
      onClick={() => tabState[1](toggleVisibility)}
    />
  </Row>
)

const Personal = () => {
  const tabState = useState(TabType.START_GUIDE)
  const Content = TabTypeComponent[tabState[0]]

  return (
    <Section>
      <Container>
        <Header tabState={tabState} />
        {Content && <Content />}
      </Container>
    </Section>
  )
}

export default Personal
