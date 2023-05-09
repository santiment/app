const _excluded = ["onClick", "classes"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import TemplateContextMenu from '../TemplateContextMenu/TemplateContextMenu';
import UseTemplateBtn from '../UseTemplateBtn/UseTemplateBtn';
import { isUserAuthorOfTemplate, usePublicTemplates } from '../Dialog/LoadTemplate/utils';
import TemplateStatus, { TemplateStatusToggle } from '../TemplateStatus/TemplateStatus';
import TemplateInfo from './TemplateInfo';
import externalStyles from '../Dialog/LoadTemplate/Template.module.css';
import styles from './TemplateDetailsDialog.module.css';
export const TemplateInfoTrigger = _ref => {
  let {
    onClick,
    classes = {}
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
    onClick: e => {
      e.stopPropagation();
      onClick(e);
    },
    variant: "flat",
    className: cx(externalStyles.menu, styles.trigger, classes.trigger)
  }), "See details");
};

const TemplateDetailsDialog = ({
  template,
  isAuthor,
  isDialog = true,
  onRename,
  onDelete,
  selectTemplate
}) => {
  const {
    isPublic,
    toggleIsPublic
  } = usePublicTemplates(template);
  const [isOpen, setOpen] = useState(false);
  const El = isDialog ? Dialog : 'div';
  return /*#__PURE__*/React.createElement(El, {
    open: isOpen,
    onOpen: () => {
      setOpen(true);
    },
    onClose: () => {
      setOpen(false);
    },
    title: isDialog ? template.title : null,
    classes: styles,
    trigger: /*#__PURE__*/React.createElement(TemplateInfoTrigger, null),
    className: styles.template
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, !isAuthor && /*#__PURE__*/React.createElement(UseTemplateBtn, {
    template: template,
    onClick: () => selectTemplate(template)
  }), /*#__PURE__*/React.createElement(TemplateContextMenu, {
    template: template,
    onRename: data => {
      setOpen(false);
      onRename(data);
    },
    classes: styles,
    onDelete: onDelete
  }), isAuthor ? /*#__PURE__*/React.createElement(TemplateStatusToggle, {
    isPublic: isPublic,
    classes: styles,
    toggleIsPublic: toggleIsPublic
  }) : /*#__PURE__*/React.createElement(TemplateStatus, {
    isAuthor: isAuthor,
    isPublic: isPublic,
    classes: styles
  })), /*#__PURE__*/React.createElement(TemplateInfo, {
    template: template,
    as: "div"
  })));
};

const mapStateToProps = ({
  user
}, {
  template
}) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
});

export default connect(mapStateToProps)(TemplateDetailsDialog);