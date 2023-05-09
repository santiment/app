import React from 'react';
import Label from '@santiment-network/ui/Label';
import Button from '@santiment-network/ui/Button';
import Edit from '../../Actions/Edit/EditAssets';
import EmptySection from '../../../../components/EmptySection/EmptySection';
import Tip from '../../../../components/EmptySection/Tip/Tip';
import { DesktopOnly } from '../../../../components/Responsive';
import { useIsAuthor } from '../../gql/list/hooks';
import styles from '../../../../pages/Watchlists/EmptySection/index.module.css';

const AssetsTemplates = ({
  watchlist,
  items
}) => {
  const {
    name,
    isPublic,
    id
  } = watchlist;
  const {
    isAuthor
  } = useIsAuthor(watchlist);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isAuthor && !isPublic && /*#__PURE__*/React.createElement(EmptySection, {
    imgClassName: styles.img
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.emptyText
  }, "List is private or doesn't exist")), !isAuthor && isPublic && items.length === 0 && /*#__PURE__*/React.createElement(EmptySection, {
    imgClassName: styles.img
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.emptyText
  }, "This public watchlist is empty")), isAuthor && items.length === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tip, {
    className: styles.tip
  }), /*#__PURE__*/React.createElement(EmptySection, {
    className: styles.emptyWrapper,
    imgClassName: styles.img
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.emptyText
  }, "Start to add assets you want to track ", /*#__PURE__*/React.createElement("br", null), " or just interested in"), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(Edit, {
    id: id,
    name: name,
    assets: items,
    watchlist: watchlist,
    trigger: /*#__PURE__*/React.createElement(Button, {
      accent: "positive",
      variant: "fill",
      className: styles.emptyBtn
    }, "Add assets")
  })))));
};

export default AssetsTemplates;