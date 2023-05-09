import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import { withExternal } from './utils';
import TopExchangesTable from '../../../components/Tables/TopExchanges';
import styles from '../index.module.css';
const Widget = withExternal(TopExchangesTable);

const TopExchangesTableWidget = ({
  target,
  widget,
  settings
}) => /*#__PURE__*/React.createElement(Widget, {
  isForcedLoading: true,
  target: target,
  slug: settings.slug,
  skip: settings.slug === 'bitcoin',
  ticker: settings.ticker,
  titleClassName: styles.exchanges__title,
  titleChildren: /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.close,
    onClick: widget.deleteWithHistory || widget.delete
  })
});

export default TopExchangesTableWidget;