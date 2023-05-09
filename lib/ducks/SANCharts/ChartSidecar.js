import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Categories from './Categories';
import { AssetsList } from '../../pages/Watchlists/AssetsMobilePage';
import RecentlyWatched, { Asset } from '../../components/RecentlyWatched/RecentlyWatched';
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs';
import Footer from '../../components/Footer';
import styles from './ChartSidecar.module.css';
export const SidecarItems = ({
  classes = {},
  hidden = false,
  onSlugSelect,
  onProjectClick,
  showFooter = false
}) => {
  const [openedList, setOpenedList] = useState();

  const assetsRenderer = ({
    key,
    index,
    style
  }) => {
    const {
      project
    } = openedList.listItems[index];
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      style: style
    }, /*#__PURE__*/React.createElement(Asset, {
      project: project,
      onClick: onSlugSelect,
      classes: classes
    }));
  };

  return hidden ? null : openedList ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, styles.content_assets, classes.sidecarCategoryAssets)
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.back, classes.sidecarBackBtn),
    onClick: () => setOpenedList()
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-left",
    className: styles.backIcon
  }), " Back"), /*#__PURE__*/React.createElement(AssetsList, {
    items: openedList.listItems.map(({
      project
    }) => project),
    renderer: assetsRenderer
  }), showFooter && /*#__PURE__*/React.createElement(Footer, {
    classes: styles
  })) : /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, classes.sidecarItems)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content__container, classes.sidecarContentContainer)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.visible
  }, /*#__PURE__*/React.createElement(RecentlyWatched, {
    className: styles.section,
    onProjectClick: onSlugSelect,
    classes: classes || styles,
    type: "assets"
  }), /*#__PURE__*/React.createElement("section", {
    className: cx(styles.section, styles.sectionOffset)
  }, /*#__PURE__*/React.createElement("h2", {
    className: cx(styles.subtitle, classes.subTitle)
  }, "Indices"), /*#__PURE__*/React.createElement(Categories, {
    onClick: setOpenedList,
    classes: styles
  })), /*#__PURE__*/React.createElement(GainersLosersTabs, {
    className: styles.section,
    titleClassName: classes.subTitle,
    timeWindow: "2d",
    size: 8,
    onProjectClick: onProjectClick,
    classes: styles
  }), showFooter && /*#__PURE__*/React.createElement(Footer, {
    classes: styles
  }))));
};