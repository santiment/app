import React, { useState } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Option from './Option';
import DialogFormRenameTemplate from '../Dialog/RenameTemplate';
import DeleteTemplate from '../Dialog/Delete/DeleteTemplate';
import ShareTemplate from '../Share/ShareTemplate';
import { isUserAuthorOfTemplate } from '../Dialog/LoadTemplate/utils';
import styles from '../Dialog/LoadTemplate/Template.module.css';

const useMenuEffects = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function openMenu(e) {
    e.stopPropagation();
    setIsMenuOpened(true);
  }

  function closeMenu() {
    setIsMenuOpened(false);
  }

  return [isMenuOpened, openMenu, closeMenu];
};

const TemplateContextMenu = ({
  template,
  onRename,
  onDelete,
  isAuthor,
  classes = {}
}) => {
  const [isMenuOpened, openMenu, closeMenu] = useMenuEffects();
  return /*#__PURE__*/React.createElement(ContextMenu, {
    open: isMenuOpened,
    onClose: closeMenu,
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      className: cx(styles.menu, classes.menuBtn, !isAuthor && styles.withUse),
      onClick: openMenu
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "dots",
      className: styles.dots
    })),
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.options
  }, isAuthor && /*#__PURE__*/React.createElement(DialogFormRenameTemplate, {
    trigger: /*#__PURE__*/React.createElement(Option, null, "Edit"),
    template: template,
    onRename: data => {
      onRename && onRename(data);
      closeMenu();
    }
  }), /*#__PURE__*/React.createElement(ShareTemplate, {
    template: template,
    className: cx(styles.option, styles.shareBtn)
  }), /*#__PURE__*/React.createElement(DeleteTemplate, {
    isAuthor: isAuthor,
    closeMenu: closeMenu,
    onDelete: onDelete,
    template: template
  })));
};

const mapStateToProps = ({
  user
}, {
  template
}) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
});

export default connect(mapStateToProps)(TemplateContextMenu);