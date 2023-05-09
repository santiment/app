import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Icon from '@santiment-network/ui/Icon';
import { ProjectSelector } from '../../../ducks/SANCharts/Header';
import { SidecarItems } from '../../../ducks/SANCharts/ChartSidecar';
import styles from './RecentsFeed.module.css';

const RecentsFeed = ({
  onSlugSelect
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ProjectSelector, {
    trigger: () => /*#__PURE__*/React.createElement("div", {
      className: styles.search
    }, "Explore assets", /*#__PURE__*/React.createElement(Icon, {
      type: "search",
      className: styles.searchIcon
    })),
    onChange: ([dataProject], closeDialog) => {
      if (dataProject) {
        onSlugSelect(dataProject);
        closeDialog();
      }
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.scrollable
  }, /*#__PURE__*/React.createElement(SidecarItems, {
    onSlugSelect: onSlugSelect,
    onProjectClick: onSlugSelect,
    classes: styles,
    showFooter: true
  })));
};

const mapDispatchToProps = dispatch => ({
  onSlugSelect: ({
    slug
  }) => {
    dispatch(push('/projects/' + slug));
  }
});

export default connect(null, mapDispatchToProps)(RecentsFeed);