import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import Svg from 'webkit/ui/Svg/react';
import { Icon } from '@santiment-network/ui';
import Tabs from '@santiment-network/ui/Tabs';
import { client } from '../../apollo';
import MobileHeader from './../../components/MobileHeader/MobileHeader';
import PageLoader from '../../components/Loader/PageLoader';
import SearchBar from './SearchBar';
import NotFound from './NotFound';
import { TABS } from '../../components/Search/tabs';
import { useTabOptions, getItemControllers } from './utils';
import styles from './SearchMobilePage.module.css';

const Link = ({
  link,
  onClick,
  children
}) => {
  if (link.toLowerCase().startsWith('http')) {
    return /*#__PURE__*/React.createElement("a", {
      href: link,
      target: "_blank",
      rel: "noopener noreferrer",
      className: styles.link,
      onClick: onClick
    }, children);
  }

  return /*#__PURE__*/React.createElement(RouterLink, {
    to: link,
    className: styles.link,
    onClick: onClick
  }, children);
};

const SearchResultRow = ({
  keys,
  selectedTab,
  activeTab,
  onClick,
  onClose
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.recent, 'mrg--b mrg-xl'),
  onClick: onClick
}, /*#__PURE__*/React.createElement(Link, {
  link: activeTab.getLinkURL(keys)
}, selectedTab === TABS[0].index && /*#__PURE__*/React.createElement("div", {
  className: cx(styles.iconholder, 'row hv-center')
}, /*#__PURE__*/React.createElement("img", {
  src: keys.logoUrl,
  alt: keys.name,
  title: keys.name,
  className: styles.asset
})), selectedTab !== TABS[0].index && /*#__PURE__*/React.createElement("div", {
  className: cx(styles.iconholder, styles[activeTab.styleKey], 'row hv-center')
}, /*#__PURE__*/React.createElement(Svg, {
  id: activeTab.icon,
  w: 11,
  h: 13
})), /*#__PURE__*/React.createElement("span", {
  className: cx(styles.name, 'body-2')
}, activeTab.getLinkLabel(keys))), onClose && /*#__PURE__*/React.createElement(Icon, {
  type: "close-medium",
  className: cx(styles.icon, styles.delete),
  onClick: onClose
}));

const SearchMobilePage = ({
  history
}) => {
  const [selectedTab, selectTab] = useState(TABS[0].index);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [result, setResult] = useState();
  const tabActions = useTabOptions(selectedTab, term);
  const [activeTab, KEY, variables] = tabActions;
  const {
    getTabItems,
    addTabItem,
    removeTabItem
  } = getItemControllers(KEY);

  function processResult(data) {
    let result = data[activeTab.responseKey];

    if (selectedTab === TABS[1].index) {
      result = result.length > 0 ? result[0].topWords : [];
    }

    let processedResult = [];
    const normalizedTerm = term.toLowerCase();

    switch (selectedTab) {
      case TABS[0].index:
        processedResult = result.filter(({
          name,
          ticker
        }) => name.toLowerCase().includes(normalizedTerm) || ticker.toLowerCase().includes(normalizedTerm));
        break;

      case TABS[1].index:
        processedResult = result.filter(({
          word
        }) => word.toLowerCase().includes(normalizedTerm));
        break;

      case TABS[2].index:
        processedResult = result.filter(({
          title
        }) => title.toLowerCase().includes(normalizedTerm));
        break;

      default:
        throw new Error('Invalid selectedTab');
    }

    setResult(processedResult);
  }

  useEffect(() => {
    setItems(getTabItems());
  }, [selectedTab]);
  useEffect(() => {
    if (loading) return;

    if (!term) {
      setResult([]);
      return;
    }

    setLoading(true);
    client.query({
      query: activeTab.query,
      variables
    }).then(({
      data
    }) => {
      processResult(data);
    }).finally(() => {
      setLoading(false);
    });
  }, [term, selectedTab]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MobileHeader, {
    goBack: history.goBack,
    backRoute: "/",
    classes: {
      wrapper: cx(styles.wrapper, 'row v-center'),
      right: styles.hidden,
      title: styles.hidden
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    onChange: setTerm
  })), /*#__PURE__*/React.createElement(Tabs, {
    options: TABS,
    defaultSelectedIndex: selectedTab,
    onSelect: tab => selectTab(tab),
    className: cx(styles.tabs, 'row justify'),
    classes: {
      tab: styles.tab
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.recentWrapper
  }, loading ? /*#__PURE__*/React.createElement(PageLoader, {
    className: styles.loader
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, !term && items.length > 0 && /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.caption, 'mrg--b mrg-xl')
  }, "Recently searched"), /*#__PURE__*/React.createElement("div", {
    className: styles.scrollable
  }, term && term.length > 0 && result ? /*#__PURE__*/React.createElement(React.Fragment, null, result.length > 0 && result.map(keys => /*#__PURE__*/React.createElement(SearchResultRow, {
    key: keys.id,
    activeTab: activeTab,
    keys: keys,
    selectedTab: selectedTab,
    onClick: () => addTabItem(keys)
  })), result.length === 0 && /*#__PURE__*/React.createElement(NotFound, null)) : items.map((keys, index) => /*#__PURE__*/React.createElement(SearchResultRow, {
    key: index,
    activeTab: activeTab,
    keys: keys,
    selectedTab: selectedTab,
    onClose: () => {
      removeTabItem(index);
      setItems(getTabItems());
    }
  }))))));
};

export default SearchMobilePage;