import React, { useState } from 'react';
import cx from 'classnames';
import { InputWithIcon } from '@santiment-network/ui';
import { useDebounceEffect } from '../../hooks';
import styles from './SearchBar.module.css';
const DEFAULT_TEXT = 'Search for assets, trends...';

const SearchBar = ({
  onChange,
  placeholder = DEFAULT_TEXT
}) => {
  const [term, setTerm] = useState('');
  useDebounceEffect(() => onChange(term.trim()), 300, [term]);

  function handleChange(event) {
    event.preventDefault();
    setTerm(event.target.value);
  }

  return /*#__PURE__*/React.createElement("form", {
    onSubmit: event => event.preventDefault(),
    className: cx(styles.wrapper, 'relative fluid flex v-center mrg-xl mrg--l'),
    onFocus: () => setTerm('')
  }, /*#__PURE__*/React.createElement(InputWithIcon, {
    type: "text",
    icon: "search-small",
    iconPosition: "left",
    className: "fluid",
    inputClassName: styles.input,
    iconClassName: styles.icon,
    placeholder: placeholder,
    value: term,
    onChange: handleChange
  }));
};

export default SearchBar;