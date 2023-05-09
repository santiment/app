import React from 'react';
import cx from 'classnames';
import { ContextMenu, Panel, Button } from '@santiment-network/ui';
import { noTrendTagsFilter } from './utils';
import styles from './InsightTags.module.css';
const VISIBLE_TAGS_BY_DEFAULT = 3;

const stopPropagation = e => e.stopPropagation();

const InsightTags = ({
  tags = [],
  isDesktop,
  className
}) => {
  const filteredTags = tags.filter(noTrendTagsFilter);
  const tagsOverflow = filteredTags.length > VISIBLE_TAGS_BY_DEFAULT ? filteredTags.length - VISIBLE_TAGS_BY_DEFAULT : 0;
  return /*#__PURE__*/React.createElement("div", {
    onClick: stopPropagation
  }, filteredTags.slice(0, VISIBLE_TAGS_BY_DEFAULT).map(({
    name
  }) => /*#__PURE__*/React.createElement("a", {
    href: `https://insights.santiment.net/tags/${name}`,
    key: name,
    rel: "noopener noreferrer",
    target: "_blank",
    className: cx(styles.tag, className)
  }, name)), tagsOverflow > 0 && /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.tag, styles.moreTagsTrigger)
    }, "+", tagsOverflow),
    position: "top",
    align: "start",
    classes: styles
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.overflowTags
  }, (isDesktop ? filteredTags.slice(VISIBLE_TAGS_BY_DEFAULT) : filteredTags).map(({
    name
  }) => /*#__PURE__*/React.createElement("a", {
    href: `https://insights.santiment.net/tags/${name}`,
    key: name,
    rel: "noopener noreferrer",
    target: "_blank",
    className: cx(styles.tag, className)
  }, name)))));
};

export default InsightTags;