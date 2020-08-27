import React, { useMemo } from 'react'
import { useAlphaReports } from '../../../pages/Marketing/AlphaBlock/AlphaBlock'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from './StablecoinsReport.module.scss'

const Icon = (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='40' height='40' rx='20' fill='var(--persimmon-light)' />
    <path
      d='M15.8352 22.9161H15.4189V23.7499H15.8352C16.0652 23.7499 16.2514 23.5636 16.2514 23.3336C16.2514 23.1036 16.0652 22.9161 15.8352 22.9161Z'
      fill='var(--persimmon)'
    />
    <path
      d='M20.209 22.9161H19.584V25.4161H20.209C20.324 25.4161 20.4177 25.3224 20.4177 25.2074V23.1249C20.4165 23.0099 20.3227 22.9161 20.209 22.9161Z'
      fill='var(--persimmon)'
    />
    <path
      d='M26.0418 10H13.9582C12.6945 10 11.667 11.0275 11.667 12.2912V27.7073C11.667 28.971 12.6945 29.9985 13.9582 29.9985H26.0418C27.3056 29.9985 28.333 28.971 28.333 27.7073V12.2912C28.3343 11.0275 27.3056 10 26.0418 10ZM15.8344 24.9998H15.4182V26.041C15.4182 26.386 15.1382 26.666 14.7932 26.666C14.4482 26.666 14.1682 26.386 14.1682 26.041V22.2911C14.1682 21.9461 14.4482 21.6661 14.7932 21.6661H15.8344C16.7532 21.6661 17.5007 22.4136 17.5007 23.3323C17.5007 24.2511 16.7532 24.9998 15.8344 24.9998ZM21.6669 25.2086C21.6669 26.0123 21.0131 26.6673 20.2081 26.6673H18.9582C18.6132 26.6673 18.3332 26.3873 18.3332 26.0423V22.2923C18.3332 21.9474 18.6132 21.6674 18.9582 21.6674H20.2081C21.0119 21.6674 21.6669 22.3211 21.6669 23.1261V25.2086ZM25.2093 23.7498C25.5543 23.7498 25.8343 24.0298 25.8343 24.3748C25.8343 24.7198 25.5543 24.9998 25.2093 24.9998H23.7506V26.041C23.7506 26.386 23.4706 26.666 23.1256 26.666C22.7806 26.666 22.5006 26.386 22.5006 26.041V23.1248C22.5006 22.3211 23.1544 21.6661 23.9593 21.6661H25.2093C25.5543 21.6661 25.8343 21.9461 25.8343 22.2911C25.8343 22.6361 25.5543 22.9161 25.2093 22.9161H23.9593C23.8443 22.9161 23.7506 23.0098 23.7506 23.1248V23.7498H25.2093Z'
      fill='var(--persimmon)'
    />
  </svg>
)

const StablecoinsReport = () => {
  const [reports, loading] = useAlphaReports()

  const stablecoinsReport = useMemo(
    () => {
      return reports.find(
        ({ name }) =>
          name.toLowerCase().indexOf('stablecoin') >= 0 &&
          name.toLowerCase().indexOf('report')
      )
    },
    [reports]
  )

  const { isPro } = useUserSubscriptionStatus()

  if (loading || !stablecoinsReport) {
    return null
  }

  const { name, description, url } = stablecoinsReport

  return (
    <a
      href={isPro ? url : '/pricing'}
      rel='noopener noreferrer'
      target={isPro ? '_blank' : '_self'}
      className={styles.container}
    >
      <div>{Icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </a>
  )
}

export default StablecoinsReport
