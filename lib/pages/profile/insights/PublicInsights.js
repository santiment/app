import React from 'react';
import cx from 'classnames';
import UserInsights from '../../../ducks/Insights/UserInsights';
import externalStyles from './../ProfilePage.module.css';

const PublicInsights = ({
  userId,
  isOwner
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(externalStyles.block, externalStyles.insights)
  }, /*#__PURE__*/React.createElement(UserInsights, {
    userId: userId,
    isOwner: isOwner
  }));
};

export default PublicInsights;