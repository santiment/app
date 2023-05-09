import React from 'react';
import NoEntries from '../../../components/EmptySection/NoEntries';
import TemplatesGrid from '../../../components/TemplatesGrid/TemplatesGrid';
import styles from './../ProfilePage.module.css';

const ProfileTemplates = ({
  data: templates,
  isOwner
}) => {
  if (!templates || templates.length === 0) {
    return /*#__PURE__*/React.createElement(NoEntries, {
      maxWidth: "400px",
      title: isOwner && 'No Chart Layouts yet',
      desc: isOwner ? " Use Charts to find divergences in Santiment's on-chain and social metrics to find ideal tops and bottoms" : "This user doesn't have any chart layouts yet"
    }, isOwner && /*#__PURE__*/React.createElement("a", {
      href: "/charts",
      className: "btn-1 body-3"
    }, "Add Chart Layout"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(TemplatesGrid, {
    templates: templates
  }));
};

export default ProfileTemplates;