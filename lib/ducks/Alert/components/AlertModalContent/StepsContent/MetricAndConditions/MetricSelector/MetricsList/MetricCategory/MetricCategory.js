import React, { useCallback, useMemo } from 'react';
import MetricButton from '../../../../../../../../Studio/Sidebar/Button';
import ExpansionItem from '../../../../../../../../../components/ExpansionItem/ExpansionItem';
import { NO_GROUP } from '../../constants';
import styles from './MetricCategory.module.css';
const buttonProps = {
  tooltipPosition: 'top',
  btnClassName: styles.button,
  addIconClassName: styles.addIcon,
  infoClassName: styles.infoIcon
};

const MetricCategory = ({
  category,
  metricsList,
  project,
  onSelect,
  defaultOpen
}) => {
  const categoryKeys = useMemo(() => Object.keys(metricsList[category]), [metricsList, category]);
  const metrics = metricsList[category];
  const renderMetrics = useCallback(categories => categories.map(({
    item,
    subitems
  }) => {
    const children = /*#__PURE__*/React.createElement(MetricButton, {
      metric: item,
      project: project,
      item: item,
      label: item.label,
      btnProps: buttonProps,
      onClick: () => onSelect(item)
    });

    if (subitems.length > 0) {
      return /*#__PURE__*/React.createElement("div", {
        key: item.key
      }, children, /*#__PURE__*/React.createElement("div", {
        className: styles.subitemsWrapper
      }, subitems.map(subitem => /*#__PURE__*/React.createElement(MetricButton, {
        metric: subitem,
        key: subitem.key,
        project: project,
        item: subitem,
        label: subitem.label,
        btnProps: buttonProps,
        onClick: () => onSelect(subitem)
      }))));
    }

    return /*#__PURE__*/React.createElement("div", {
      key: item.key
    }, children);
  }), [project]);
  const renderCategories = useCallback(() => categoryKeys.map(categoryTitle => {
    if (categoryTitle === NO_GROUP) {
      return renderMetrics(metrics[categoryTitle]);
    }

    return /*#__PURE__*/React.createElement("div", {
      key: categoryTitle
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.categoryTitle
    }, categoryTitle), renderMetrics(metrics[categoryTitle]));
  }), [categoryKeys, metrics]);
  return /*#__PURE__*/React.createElement(ExpansionItem, {
    isOpen: defaultOpen,
    title: category,
    classes: {
      expansion: styles.expansionContainer,
      title: styles.expansionTitle,
      opened: styles.expansionOpened,
      arrow: styles.expansionIcon
    },
    iconType: "arrow-down"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, renderCategories()));
};

export default MetricCategory;