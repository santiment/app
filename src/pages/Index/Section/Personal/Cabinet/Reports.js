import React from 'react'
import Skeleton from '../../../../../components/Skeleton/Skeleton'
import ReportCard from './ReportCard/ReportCard'
import { useAlphaReports } from '../../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'

const Reports = () => {
  const [reports, loading] = useAlphaReports()

  return (
    <>
      {loading && <Skeleton show={loading} repeat={2} />}
      {reports.map((item, index) => (
        <ReportCard key={index} report={item} />
      ))}
    </>
  )
}

export default Reports
