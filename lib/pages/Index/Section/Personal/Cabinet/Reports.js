import React from 'react';
import Skeleton from '../../../../../components/Skeleton/Skeleton';
import ReportCard from './ReportCard/ReportCard';
import { useAlphaReports } from '../../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport';
import styles from './Reports.module.css';

const Reports = () => {
  const [reports, loading] = useAlphaReports();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, loading && /*#__PURE__*/React.createElement(Skeleton, {
    show: loading,
    repeat: 5,
    className: styles.skeleton
  }), reports.map(item => /*#__PURE__*/React.createElement(ReportCard, {
    key: item.name,
    report: item
  })));
};

export default Reports;