import React from 'react';
import cx from 'classnames';
import toReact from 'svelte-adapter/react';
import SvelteInsightCardWithMarketcap from './index.svelte';
import styles from './index.module.css';

const ReactInsightCardWithMarketCap = () => null;

const InsightCardWithMarketcap = ({
  insight,
  className
}) => /*#__PURE__*/React.createElement(ReactInsightCardWithMarketCap, {
  insight: insight,
  className: cx(styles.wrapper, className)
});

export default InsightCardWithMarketcap;