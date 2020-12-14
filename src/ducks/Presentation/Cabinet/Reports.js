import React from 'react'
import { useAlphaReports } from '../../../pages/Marketing/AlphaBlock/AlphaBlock'
import CabinetTitle from './CabinetTitle/CabinetTitle'
import Skeleton from '../../../components/Skeleton/Skeleton'
import ReportCard from './ReportCard/ReportCard'
import { ReportsImg } from './images'
import styles from './Cabinet.module.scss'

const Reports = () => {
  const [reports, loading] = useAlphaReports()

  return (
    <>
      <CabinetTitle
        img={ReportsImg}
        title={'Weekly Reports'}
        description={
          'Check out our latest premium reports about crypto activity in the market'
        }
      />

      <Skeleton show={loading} repeat={3} className={styles.skeleton} />

      {reports.map((item, index) => (
        <ReportCard key={index} report={item} />
      ))}
    </>
  )
}

export default Reports
