import React from 'react';
import AutoresizeTextarea from '../../components/AutoresizeTextarea';
import { updateWatchlistShort } from '../Watchlists/gql/list/mutations';
import { notifyError, notifySaveNote } from '../Watchlists/Widgets/TopPanel/notifications';
import styles from './index.module.css';

const Note = ({
  notes,
  address,
  infrastructure,
  watchlistId,
  isAuthor
}) => {
  function updateItem(notes) {
    if (isAuthor) {
      updateWatchlistShort({
        id: +watchlistId,
        listItems: [{
          blockchainAddress: {
            address,
            infrastructure,
            notes
          }
        }]
      }, 'UPDATE_ITEMS').then(() => notifySaveNote()).catch(() => notifyError('note', 'save'));
    }
  }

  if (notes === undefined) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.note
  }, /*#__PURE__*/React.createElement(AutoresizeTextarea, {
    maxLength: 80,
    onBlur: updateItem,
    blurOnEnter: true,
    readOnly: !isAuthor,
    placeholder: "Add note",
    defaultValue: notes || ''
  }));
};

export default Note;