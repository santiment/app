import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { useHistory } from 'react-router-dom'
import Accordion from '../../Accordion'
import { ProUpgradeBanner } from '../../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import CabinetTitle from './Cabinet/CabinetTitle/CabinetTitle'
import { ReportsImg, SheetsTemplatesImg } from './Cabinet/images'
import Reports from './Cabinet/Reports'
import SheetsTemplates from './Cabinet/SheetsTemplates/SheetsTemplates'
import { useDebounceEffect } from '../../../../hooks'
import styles from './Cabinet.module.scss'

const SHEETS_ANCHOR = '#san-sheets'

const CABINETS = [
  {
    title: (
      <CabinetTitle
        img={ReportsImg}
        title='Weekly Reports'
        description={
          'Check out our latest premium reports about crypto activity in the market'
        }
      />
    ),
    content: (
      <div className={styles.reports}>
        <Reports />
      </div>
    ),
    isOpened: true
  },
  {
    title: (
      <CabinetTitle
        as={HashLink}
        to={SHEETS_ANCHOR}
        onClick={e => {
          e.stopPropagation()
        }}
        img={<div className={styles.img}>{SheetsTemplatesImg}</div>}
        title='Sansheets Pro Templates'
        description={
          <>
            A collection of trading and research models built with{' '}
            <a
              href='https://sheets.santiment.net/'
              className={styles.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              Sansheets
            </a>
            , a plugin that lets you directly import Santiment’s data into
            Google Spreadsheets. Popular PRO templates include Price-DAA
            divergence, MVRV comparison model, NVT ratio and more.
          </>
        }
      />
    ),
    content: <SheetsTemplates />,
    isOpened: true
  }
]

function hashLinkScroll ({ location }) {
  const { hash } = location
  if (hash !== '') {
    const elements = document.querySelectorAll(`a[href='/${hash}']`)
    if (elements && elements.length > 0) {
      elements[0].scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}

const useAnchorLoading = (deps, scrollAnchors) => {
  const history = useHistory()

  useDebounceEffect(
    () => {
      if (scrollAnchors.indexOf(history.location.hash) !== -1) {
        hashLinkScroll(history)
      }
    },
    1000,
    [history.location, scrollAnchors, ...deps]
  )
}

const SCROLLABLE_ANCHORS = [SHEETS_ANCHOR]

const Cabinet = () => {
  const { isPro, loading } = useUserSubscriptionStatus()

  useAnchorLoading([loading], SCROLLABLE_ANCHORS)

  if (loading) return null

  if (!isPro) {
    return <ProUpgradeBanner classes={styles} />
  }

  return CABINETS.map(({ title, content, isOpened }, index) => (
    <Accordion
      key={index}
      title={title}
      isOpenedDefault={isOpened}
      showArrow={false}
      classes={styles}
    >
      {content}
    </Accordion>
  ))
}

export default Cabinet
