import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import Labels from './Labels';
import { useProject } from '../../../../../hooks/project';
import Skeleton from '../../../../../components/Skeleton/Skeleton';
import { ProjectIcon } from '../../../../../components/ProjectIcon/ProjectIcon';
import Crown from '../../../../../components/Illustrations/Crown';
import styles from './StackholderTitle.module.css';
const OBJ = {};

const getUniqueLabels = labels => [...new Set(labels)];

function onLinkClick(e) {
  e.stopPropagation();
}

export const StakeholderProBanner = ({
  signals
}) => {
  const uniqueLabels = getUniqueLabels(signals);
  return /*#__PURE__*/React.createElement(Link, {
    to: "/pricing",
    className: styles.containerPro,
    target: "_blank"
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(Crown, {
    className: styles.imgPro
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.name
  }, "PRO signals", /*#__PURE__*/React.createElement("div", {
    className: cx(styles.count, styles.countPro)
  }, signals.length))), /*#__PURE__*/React.createElement(Button, {
    className: styles.upgrade,
    accent: "orange",
    variant: "fill"
  }, "Upgrade"), /*#__PURE__*/React.createElement(Labels, {
    labels: uniqueLabels
  }));
};

const StackholderTitle = ({
  project: targetProject,
  count,
  slug,
  labels
}) => {
  const uniqueLabels = getUniqueLabels(labels);
  const [project = targetProject, loading] = useProject(!targetProject && slug);
  const {
    logoUrl,
    name,
    ticker
  } = project || OBJ;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("a", {
    className: styles.info,
    href: `/charts?slug=${slug}`,
    onClick: onLinkClick,
    rel: "noopener noreferrer",
    target: "_blank"
  }, !loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProjectIcon, {
    slug: slug,
    size: 20,
    logoUrl: logoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.name
  }, name), /*#__PURE__*/React.createElement("div", {
    className: styles.ticker
  }, ticker, " ", /*#__PURE__*/React.createElement("div", {
    className: styles.count
  }, count))), /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    show: loading,
    className: styles.skeleton,
    wrapperClassName: styles.skeletonWrapper
  })), /*#__PURE__*/React.createElement(Labels, {
    labels: uniqueLabels
  }));
};

export default StackholderTitle;