import React from 'react'
import { useAlphaReports } from '../../../pages/Marketing/AlphaBlock/AlphaBlock'
import ReportCard from './ReportCard/ReportCard'
import { ReportsImg } from './images'
import Skeleton from '../../../components/Skeleton/Skeleton'
import styles from './Cabinet.module.scss'

const Cabinet = () => {
  const [reports, loading] = useAlphaReports()

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          {ReportsImg}

          <div className={styles.header__content}>
            <div className={styles.header__content__title}>Weekly Reports</div>
            <div className={styles.header__content__description}>
              Check out our latest premium reports about crypto activity in the
              market
            </div>
          </div>
        </div>
      </div>

      <Skeleton show={loading} repeat={3} className={styles.skeleton} />

      {reports.map((item, index) => (
        <ReportCard key={index} report={item} />
      ))}
    </div>
  )
}

export default Cabinet
