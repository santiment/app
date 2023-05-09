import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Message from '@santiment-network/ui/Message';
import { HISTOGRAM_USER_PERIOD_RESTRICTIONS_QUERY } from './gql';
import UpgradeBtn from '../../../../components/UpgradeBtn/UpgradeBtn';
import { getDateFormats } from '../../../../utils/dates';
import styles from './index.module.css';

function formatRestrictionDate(date) {
  const {
    DD,
    MMM,
    YYYY
  } = getDateFormats(new Date(date));
  return `${DD} ${MMM} ${YYYY}`;
}

const DEFAULT_PERIOD = 'from 29 Dec 2019 to 26 Mar 2020';
export default (() => {
  const [availablePeriodLabel, setAvailablePeriodLabel] = useState(DEFAULT_PERIOD);
  const {
    data
  } = useQuery(HISTOGRAM_USER_PERIOD_RESTRICTIONS_QUERY);
  useEffect(() => {
    if (data) {
      const {
        restrictedFrom,
        restrictedTo
      } = data.getMetric.metadata;
      const formattedFrom = formatRestrictionDate(restrictedFrom);
      const formattedTo = formatRestrictionDate(restrictedTo);
      setAvailablePeriodLabel(`from ${formattedFrom} to ${formattedTo}`);
    }
  }, [data]);
  return /*#__PURE__*/React.createElement(Message, {
    variant: "warn",
    className: styles.msg
  }, /*#__PURE__*/React.createElement("p", null, "Selected date is outside of the allowed interval."), /*#__PURE__*/React.createElement("p", null, "Your current subscription plan allows you to see data only ", availablePeriodLabel, "."), /*#__PURE__*/React.createElement(UpgradeBtn, {
    className: styles.upgrade,
    variant: "fill"
  }));
});