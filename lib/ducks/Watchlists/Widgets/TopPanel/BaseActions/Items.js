const _excluded = ["className", "children", "icon", "variant"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import NewAction from '../../../Actions/New';
import SaveAsAction from '../../../Actions/SaveAs';
import DeleteAction from '../../../Actions/Delete';
import CopyAction from '../../../Actions/Copy';
import EditForm from '../../../Actions/Edit/EditForm';
import styles from './Items.module.css';
export const Item = _ref => {
  let {
    className,
    children,
    icon,
    variant = 'ghost'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Button, _extends({}, props, {
    fluid: true,
    variant: variant,
    className: cx(styles.btn, className)
  }), icon && /*#__PURE__*/React.createElement(Icon, {
    type: icon,
    className: styles.icon
  }), children);
};
export const NonAuthorTrigger = props => /*#__PURE__*/React.createElement(Item, _extends({}, props, {
  icon: "disk",
  border: true,
  className: styles.saveAsNonAuthor
}), "Save as");
export const Trigger = ({
  type,
  forwardedRef,
  isActive,
  onPrimaryAction,
  openMenu,
  widgets
}) => {
  const onSubmit = props => onPrimaryAction(props);

  return /*#__PURE__*/React.createElement("div", {
    className: styles.trigger,
    ref: forwardedRef
  }, /*#__PURE__*/React.createElement(NewAction, {
    type: type,
    source: "new",
    infographics: widgets,
    onSubmit: onSubmit,
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: styles.trigger__text
    }, "New")
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.trigger__arrowBtn, isActive && styles.trigger__arrowBtn_active),
    onClick: openMenu
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-down",
    className: cx(styles.trigger__arrow, isActive && styles.trigger__arrow_active)
  })));
};
export const Delete = ({
  id,
  name,
  title
}) => /*#__PURE__*/React.createElement(DeleteAction, {
  title: `Do you want to delete this ${title}?`,
  id: id,
  name: name,
  trigger: /*#__PURE__*/React.createElement(Item, {
    icon: "remove",
    className: styles.delete
  }, "Delete")
});
export const New = ({
  type,
  onSubmit,
  widgets,
  source = 'new'
}) => /*#__PURE__*/React.createElement(NewAction, {
  type: type,
  onSubmit: onSubmit,
  source: source,
  infographics: widgets,
  trigger: /*#__PURE__*/React.createElement(Item, {
    icon: "plus-round"
  }, "New")
});
export const SaveAs = ({
  type,
  watchlist,
  widgets
}) => {
  const showDuplicate = ['SCREENER', 'PROJECT', 'BLOCKCHAIN_ADDRESS'].includes(type);
  const iconName = showDuplicate ? 'duplicate' : 'disk';
  return /*#__PURE__*/React.createElement(SaveAsAction, {
    type: type,
    watchlist: watchlist,
    source: "duplicate",
    infographics: widgets,
    trigger: /*#__PURE__*/React.createElement(Item, {
      icon: iconName,
      className: iconName
    }, showDuplicate ? 'Duplicate' : 'Save as')
  });
};
export const Edit = ({
  type,
  title,
  watchlist,
  onSubmit,
  isLoading,
  trigger
}) => {
  const [opened, setOpened] = useState(false);
  const {
    name,
    description,
    isPublic
  } = watchlist;
  return /*#__PURE__*/React.createElement(EditForm, {
    type: type,
    open: opened,
    id: watchlist.id,
    watchlist: watchlist,
    isLoading: isLoading,
    toggleOpen: setOpened,
    title: 'Edit ' + title,
    trigger: trigger || /*#__PURE__*/React.createElement(Item, {
      icon: "edit"
    }, "Edit"),
    settings: {
      name,
      description,
      isPublic
    },
    onFormSubmit: payload => onSubmit(payload).then(() => setOpened(false))
  });
};
export const Copy = ({
  watchlist
}) => {
  return /*#__PURE__*/React.createElement(CopyAction, {
    id: watchlist.id,
    assets: watchlist.listItems.map(l => l.project),
    trigger: /*#__PURE__*/React.createElement(Item, {
      icon: "copy"
    }, "Copy assets")
  });
};