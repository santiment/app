import React from 'react';
import cx from 'classnames';
import ConfirmDialog from '../../../../../components/ConfirmDialog/ConfirmDialog';
import Option from '../../TemplateContextMenu/Option';
import { useDeleteTemplate } from '../../gql/hooks';
import styles from './DeleteTemplate.module.css';

const DeleteTemplate = ({
  isAuthor,
  onDelete,
  template,
  closeMenu,
  className
}) => {
  if (!isAuthor) {
    return null;
  }

  const [deleteTemplate, loading] = useDeleteTemplate();
  return /*#__PURE__*/React.createElement(ConfirmDialog, {
    title: "Do you want to delete this template?",
    trigger: /*#__PURE__*/React.createElement(Option, {
      className: cx(styles.delete, className)
    }, "Delete"),
    onApprove: () => {
      deleteTemplate(template, onDelete).then(closeMenu);
    },
    onCancel: closeMenu,
    isLoading: loading
  });
};

export default DeleteTemplate;