import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StartGuide from './StartGuide'
import Cabinet from './Cabinet'
import { Section, Container, Row } from '../index'
import { Tab } from '../Trends'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import styles from './index.module.scss'

const tabByAnchor = () => {
  const hash = window.location.hash

  if (hash === TabType.CABINET.anchor) {
    return TabType.CABINET.title
  }
}

const LS_PERSONAL_TAB = 'LS_PERSONAL_TAB'
const TabType = {
  START_GUIDE: {
    title: 'Quick Start Guide'
  },
  CABINET: {
    title: 'Cabinet',
    anchor: '#cabinet'
  }
}
const TabTypeComponent = {
  [TabType.START_GUIDE.title]: StartGuide,
  [TabType.CABINET.title]: Cabinet
}

const toggleVisibility = tab => (tab ? null : TabType.START_GUIDE.title)
const saveTab = tab => localStorage.setItem(LS_PERSONAL_TAB, tab || '')
function loadTab () {
  const savedTab = localStorage.getItem(LS_PERSONAL_TAB)
  const anchorTab = tabByAnchor()

  const target = anchorTab || savedTab
  const currentTab = target === null ? TabType.START_GUIDE.title : target

  if (currentTab && currentTab !== savedTab) {
    saveTab(target)
  }

  return currentTab
}

const Header = ({ tabState }) => (
  <Row className={styles.header}>
    <Tab tab={TabType.START_GUIDE.title} tabState={tabState} />
    <Tab
      tab={TabType.CABINET.title}
      tabState={tabState}
      className={styles.cabinet}
    />
    <Toggle
      className={styles.toggle}
      isActive={tabState[0]}
      onClick={() => tabState[1](toggleVisibility)}
    />
  </Row>
)

const Personal = () => {
  const [activeTab, setTab] = useState(loadTab)
  const Content = TabTypeComponent[activeTab]

  const history = useHistory()

  useEffect(() => saveTab(activeTab), [activeTab])

  function updateTab (target) {
    setTab(target)

    if (target) {
      const tab = Object.values(TabType).find(({ title }) => title === target)
      const anchor = tab.anchor ? tab.anchor : ''

      if (tab) {
        history.replace(`${window.location.pathname}${anchor}`)
      }
    }
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
