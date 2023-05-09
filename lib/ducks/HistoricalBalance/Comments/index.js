import React, { useMemo } from 'react';
import toReact from 'svelte-adapter/react';
import { CommentsType } from 'webkit/api/comments';
import SvelteComments from 'webkit/ui/Comments/svelte';
import { useBlockchainAddress } from '../hooks';
import { useUser } from '../../../stores/user';
import { onAnonComment } from '../../../pages/Studio/utils';
import styles from './index.module.css';
const ReactComments = toReact(SvelteComments, {}, 'div');

const Comments = ({
  settings
}) => {
  const blockchainAddress = useBlockchainAddress(settings);
  const {
    user
  } = useUser();
  const commentsFor = useMemo(() => {
    blockchainAddress.user = {};
    blockchainAddress.title = settings.address;
    return blockchainAddress;
  }, [settings, blockchainAddress]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, commentsFor.id && /*#__PURE__*/React.createElement(ReactComments, {
    type: CommentsType.Address,
    commentsFor: commentsFor,
    currentUser: user,
    onAnonComment: onAnonComment
  }));
};

export default Comments;