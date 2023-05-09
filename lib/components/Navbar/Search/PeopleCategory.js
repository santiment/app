const _excluded = ["searchTerm"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Category from './Category';
import styles from './Category.module.css';
const DEFAULT_SUGGESTIONS = [];
const POPULAR_AUTHORS_QUERY = gql`
  query {
    popularInsightAuthors {
      id
      username
      avatarUrl
    }
  }
`;

const propsAccessor = ({
  id
}) => ({
  key: id,
  to: '/profile/' + id
});

function peoplePredicate(value) {
  const searchTerm = value.toLowerCase();
  return ({
    username
  }) => username.toLowerCase().includes(searchTerm);
}

function usePeople() {
  const {
    data
  } = useQuery(POPULAR_AUTHORS_QUERY);
  return data ? data.popularInsightAuthors : DEFAULT_SUGGESTIONS;
}

const Person = ({
  avatarUrl,
  username
}) => /*#__PURE__*/React.createElement(React.Fragment, null, avatarUrl ? /*#__PURE__*/React.createElement("img", {
  className: styles.avatar,
  src: avatarUrl,
  alt: "Avatar"
}) : /*#__PURE__*/React.createElement("div", {
  className: styles.fallback
}, username[0]), /*#__PURE__*/React.createElement("span", {
  className: styles.username
}, username));

const PeopleCategory = _ref => {
  let {
    searchTerm
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const people = usePeople();
  const suggestions = useMemo(() => people.filter(peoplePredicate(searchTerm)).slice(0, 5), [searchTerm, people]);
  return suggestions.length ? /*#__PURE__*/React.createElement(Category, _extends({}, props, {
    className: styles.category_people,
    title: "People",
    items: suggestions,
    Item: Person,
    propsAccessor: propsAccessor
  })) : null;
};

export default PeopleCategory;