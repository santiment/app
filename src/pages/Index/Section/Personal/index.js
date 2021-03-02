import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StartGuide from './StartGuide'
import Cabinet from './Cabinet'
import { Section, Container, Row } from '../index'
import { Tab } from '../Trends'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import styles from './index.module.scss'

const LS_PERSONAL_TAB = 'LS_PERSONAL_TAB'
const TabType = {
  START_GUIDE: 'Quick Start Guide',
  CABINET: 'Cabinet'
}

const TabHash = {
  [TabType.CABINET]: '#cabinet'
}

const HashTab = Object.entries(TabHash).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {})

const TabTypeComponent = {
  [TabType.START_GUIDE]: StartGuide,
  [TabType.CABINET]: Cabinet
}

const toggleVisibility = tab => (tab ? null : TabType.START_GUIDE)
const saveTab = tab => localStorage.setItem(LS_PERSONAL_TAB, tab || '')

function loadTab () {
  const hashTab = HashTab[window.location.hash]
  if (hashTab) return hashTab

  const tab = localStorage.getItem(LS_PERSONAL_TAB)
  return tab === null ? TabType.START_GUIDE : tab
}

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
  const history = useHistory()
  const [activeTab, setTab] = useState(loadTab)
  const Content = TabTypeComponent[activeTab]

  useEffect(() => saveTab(activeTab), [activeTab])

  function updateTab (target) {
    setTab(target)

    const hash = TabHash[target] || ''
    history.replace(window.location.pathname + hash)
  }

  return (
    <Section>
      <Container>
        <Header tabState={[activeTab, updateTab]} />
        {Content && <Content />}
      </Container>
    </Section>
  )
}

export default Personal
