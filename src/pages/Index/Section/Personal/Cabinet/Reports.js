import React from 'react'
import Skeleton from '../../../../../components/Skeleton/Skeleton'
import ReportCard from './ReportCard/ReportCard'
import { useAlphaReports } from '../../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import styles from './Reports.module.scss'

const Reports = () => {
  const [reports, loading] = useAlphaReports()

  return (
    <div className={styles.wrapper}>
      {loading && <Skeleton show={loading} repeat={5} className={styles.skeleton} />}
      {reports.map((item) => (
        <ReportCard key={item.name} report={item} />
      ))}
    </div>
  )
}

export default Reports
