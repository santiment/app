import React from 'react';
import cx from 'classnames'; // import toReact from 'svelte-adapter/react'
// import SvelteInsightCard from './index.svelte'

import styles from '../InsightCardWithMarketcap/index.module.css';

const ReactInsightCard = () => null;

const InsightCard = ({
  insight,
  className
}) => /*#__PURE__*/React.createElement(ReactInsightCard, {
  insight: insight,
  className: cx(styles.wrapper, className)
});

export default InsightCard;