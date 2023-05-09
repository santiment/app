import React from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import { Checkbox } from '@santiment-network/ui';
import ProjectIcon from '../../../../../../components/ProjectIcon/ProjectIcon';
import { formatTokensCount } from '../../../../../../utils/formatting';
import styles from './ProjectsList.module.css';

const List = () => {};

const AutoSizer = () => {};

const ROW_HEIGHT = 32;
const MAX_SHOWING_ITEMS = 4;

const ProjectsList = ({
  items,
  listItems,
  onToggleProject,
  isContained,
  hideCheckboxes = false
}) => {
  const rowRenderer = ({
    key,
    index,
    style
  }) => {
    const {
      name,
      ticker,
      slug,
      id,
      balance,
      logoUrl
    } = items[index];
    const isAssetInList = listItems.some(({
      id: itemId
    }) => itemId === id);
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: styles.project,
      style: style,
      onClick: () => {
        onToggleProject({
          project: items[index],
          listItems,
          isAssetInList
        });
      }
    }, !hideCheckboxes && /*#__PURE__*/React.createElement(Checkbox, {
      isActive: isAssetInList,
      disabled: isContained ? false : isAssetInList
    }), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.asset, !isContained && isAssetInList && styles.disabled)
    }, /*#__PURE__*/React.createElement(ProjectIcon, {
      className: styles.icon,
      size: 16,
      slug: slug,
      logoUrl: logoUrl
    }), /*#__PURE__*/React.createElement("span", {
      className: styles.name
    }, name), /*#__PURE__*/React.createElement(Label, {
      accent: "waterloo"
    }, "(", balance >= 0 && /*#__PURE__*/React.createElement(Label, {
      className: styles.balance
    }, formatTokensCount(balance)), ticker, ")")));
  };

  const wrapperStyles = {
    height: items.length > MAX_SHOWING_ITEMS ? `160px` : `${32 * items.length}px`,
    paddingRight: items.length > MAX_SHOWING_ITEMS ? '0px' : `5px`
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrapperStyles,
    className: styles.wrapperList
  }, /*#__PURE__*/React.createElement(AutoSizer, null, ({
    height,
    width
  }) => /*#__PURE__*/React.createElement(List, {
    className: styles.list,
    width: width,
    height: height,
    rowHeight: ROW_HEIGHT,
    rowCount: items.length,
    overscanRowCount: 5,
    rowRenderer: rowRenderer
  })));
};

export default ProjectsList;