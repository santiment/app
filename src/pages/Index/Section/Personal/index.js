import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { Section, Container, Row } from '../index'
import { Tab } from '../Trends'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import StartGuide from './StartGuide'
import Cabinet from './Cabinet'
import styles from './index.module.scss'

const LS_PERSONAL_TAB = 'LS_PERSONAL_TAB'
export const PersonalTabType = {
  START_GUIDE: 'Quick Start Guide',
  CABINET: 'Cabinet',
  SHEETS: 'Sheets'
}

export const PersonalTabHashes = {
  [PersonalTabType.CABINET]: '#cabinet',
  [PersonalTabType.SHEETS]: '#san-sheets'
}

const HashTab = Object.entries(PersonalTabHashes).reduce(
  (acc, [key, value]) => {
    acc[value] = key
    return acc
  },
  {}
)

export const TabTypeComponent = {
  [PersonalTabType.START_GUIDE]: StartGuide,
  [PersonalTabType.CABINET]: Cabinet,
  [PersonalTabType.SHEETS]: Cabinet
}

export const toggleVisibility = tab => {
  return tab ? null : PersonalTabType.START_GUIDE
}

export const saveTab = tab => localStorage.setItem(LS_PERSONAL_TAB, tab || '')

export function loadTab () {
  const hashTab = HashTab[window.location.hash]
  if (hashTab) {
    switch (hashTab) {
      case PersonalTabType.SHEETS:
        return PersonalTabType.CABINET
      default:
        return hashTab
    }
  }

  const tab = localStorage.getItem(LS_PERSONAL_TAB)
  return tab === null ? PersonalTabType.START_GUIDE : tab
}

const Header = ({ tabState }) => (
  <Row className={styles.header}>
    <Tab tab={PersonalTabType.START_GUIDE} tabState={tabState} />
    <Tab
      tab={PersonalTabType.CABINET}
      tabState={tabState}
      className={styles.cabinet}
      as={HashLink}
      to='#san-sheets'
    />
    <Toggle
      className={styles.toggle}
      isActive={tabState[0]}
      onClick={() => tabState[1](toggleVisibility())}
    />
  </Row>
)

const Personal = () => {
  const history = useHistory()
  const tabState = useState(loadTab)

  const [activeTab] = tabState
  const Content = TabTypeComponent[activeTab]

  useEffect(
    () => {
      saveTab(activeTab)

      const hash = PersonalTabHashes[activeTab] || ''
      history.replace(window.location.pathname + hash)
    },
    [activeTab]
  )

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
