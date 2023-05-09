import React from 'react';
import { Link } from 'react-router-dom';
import Select from '@santiment-network/ui/Select/Select';
import Loader from '@santiment-network/ui/Loader/Loader';
import FeedFiltersDdWrapper from './FeedFiltersDdWrapper';
import { useProjectWatchlists } from '../../../ducks/Watchlists/gql/lists/hooks';
import styles from './FeedFiltersDdWrapper.module.css';

const FeedWatchlistsFilter = ({
  ids,
  onUpdate
}) => {
  const [watchlists, loading] = useProjectWatchlists();
  return /*#__PURE__*/React.createElement(FeedFiltersDdWrapper, {
    title: "Watchlist(s)",
    ids: ids,
    onUpdate: onUpdate,
    render: ({
      onChange,
      selectedValues,
      data,
      setData
    }) => {
      if (watchlists.length > 0 && !data.length) {
        setData(watchlists);
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, loading && /*#__PURE__*/React.createElement(Loader, {
        className: styles.loader
      }), watchlists.length > 0 ? /*#__PURE__*/React.createElement(Select, {
        maxHeight: 330,
        classNamePrefix: "react-select",
        minimumInput: 1,
        onChange: onChange,
        multi: true,
        value: selectedValues,
        placeholder: "Choose watchlists",
        required: true,
        valueKey: "id",
        isClearable: false,
        labelKey: "name",
        options: watchlists
      }) : /*#__PURE__*/React.createElement(Link, {
        className: styles.link,
        to: "/assets"
      }, "Create watchlist"));
    }
  });
};

export default FeedWatchlistsFilter;