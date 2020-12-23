import React from 'react'
import Accordion from '../../Accordion'
import { ProUpgradeBanner } from '../../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import Reports from './Cabinet/Reports'
import CabinetTitle from './Cabinet/CabinetTitle/CabinetTitle'
import { ReportsImg, SheetsTemplatesImg } from './Cabinet/images'
import SheetsTemplates from './Cabinet/SheetsTemplates/SheetsTemplates'
import styles from './Cabinet.module.scss'

const cabinets = [
  {
    title: (
      <CabinetTitle
        img={ReportsImg}
        title={'Weekly Reports'}
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
        img={<div className={styles.img}>{SheetsTemplatesImg}</div>}
        title={'Sansheets Pro Templates'}
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

const Cabinet = () => {
  const { isPro, loading } = useUserSubscriptionStatus()

  if (loading) return null

  if (!isPro) {
    return <ProUpgradeBanner classes={styles} />
  }

  return cabinets.map(({ title, content, isOpened }) => (
    <Accordion
      key={title}
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
