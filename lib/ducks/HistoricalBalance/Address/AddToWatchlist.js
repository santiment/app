import React from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { Infrastructure } from '../../../utils/address';
import AddToWatchlistDialog from '../../Watchlists/Actions/Add/Add';
import { useAddressWatchlists } from '../../Watchlists/gql/lists/hooks';
import { updateWatchlistShort } from '../../Watchlists/gql/list/mutations';
import styles from './index.module.css';

const addToWatchlist = ({
  id,
  listItems
}) => updateWatchlistShort({
  id: +id,
  listItems
}, 'ADD_ITEMS');

const AddToWatchlist = ({
  address,
  infrastructure,
  note
}) => {
  function checkIsListItemTheAddress({
    blockchainAddress
  }) {
    return blockchainAddress.address === address;
  }

  function checkIsSelected({
    listItems
  }) {
    return listItems.some(checkIsListItemTheAddress);
  }

  function onChangesApply(addToWatchlists) {
    const newListItem = {
      blockchainAddress: {
        address,
        infrastructure,
        notes: note,
        __typename: 'BlockchainAddress'
      },
      __typename: 'ListItem'
    };
    const updatedWatchlists = addToWatchlists.map(({
      id
    }) => ({
      listItems: [newListItem],
      id
    }));
    return Promise.all(updatedWatchlists.map(addToWatchlist));
  }

  return /*#__PURE__*/React.createElement(AddToWatchlistDialog, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: styles.btn,
      disabled: infrastructure !== Infrastructure.ETH
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "plus-round",
      className: styles.btn__icon
    }), "Add to Watchlist"),
    getWatchlists: useAddressWatchlists,
    checkIsWatchlistSelected: checkIsSelected,
    onChangesApply: onChangesApply
  });
};

export default AddToWatchlist;