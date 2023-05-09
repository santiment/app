import React from 'react';
import FormikRadio from '../../../components/formik-santiment-ui/FormikRadio';
import styles from './AlertsAndInsightsFilter.module.css';
import { checkIsLoggedIn } from '../../UserSelectors';
import { connect } from 'react-redux';
export const AUTHOR_TYPES = {
  OWN: 'OWN',
  ALL: 'ALL',
  FOLLOWED: 'FOLLOWED',
  SANFAM: 'SANFAM'
};
const EVENTS_TYPES = [{
  label: 'Show all',
  type: AUTHOR_TYPES.ALL
}, {
  label: 'Only from Santiment team',
  type: AUTHOR_TYPES.SANFAM
}, {
  label: 'Only from people you follow',
  type: AUTHOR_TYPES.FOLLOWED,
  hideForAnon: true
}];

const AlertsAndInsightsFilter = ({
  selected,
  onUpdate,
  isLoggedIn
}) => {
  const toggleSelection = item => {
    onUpdate && onUpdate(item.type);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Alerts & Insights"), EVENTS_TYPES.map(item => {
    return (!item.hideForAnon || isLoggedIn) && /*#__PURE__*/React.createElement(FormikRadio, {
      key: item.type,
      isSelected: item.type === selected,
      item: item,
      onClick: toggleSelection,
      classes: styles
    });
  }));
};

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  };
};

export default connect(mapStateToProps)(AlertsAndInsightsFilter);