function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import cx from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import ProfileInfo, { ShareProfile } from './info/ProfileInfo';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import PageLoader from '../../components/Loader/PageLoader';
import ProfileActivities from './activities/ProfileActivities';
import { PUBLIC_USER_DATA_QUERY, PUBLIC_CURRENT_USER_DATA_QUERY, updateCurrentUserFollowQueryCache, useOldUserFollowersFollowing } from '../../queries/ProfileGQL';
import { MobileOnly } from '../../components/Responsive';
import { mapQSToState } from '../../utils/utils';
import { useUser } from '../../stores/user';
import styles from './ProfilePage.module.css';
export const usePublicUserData = (variables, currentUserId) => {
  const isCurrentUser = variables.userId === currentUserId;
  const QUERY = isCurrentUser ? PUBLIC_CURRENT_USER_DATA_QUERY : PUBLIC_USER_DATA_QUERY;
  const QUERY_FIELD = isCurrentUser ? 'currentUser' : 'getUser';
  const query = useQuery(QUERY, !isCurrentUser && {
    variables: _objectSpread({}, variables)
  });
  return useMemo(() => {
    const {
      data,
      loading,
      error
    } = query;
    return {
      data: data ? data[QUERY_FIELD] : undefined,
      loading,
      error
    };
  }, [query]);
};

const getQueryVariables = ({
  currentUserId,
  location,
  match: {
    params: {
      id
    } = {}
  } = {}
}) => {
  let variables;

  if (id) {
    variables = {
      userId: id
    };
  } else {
    const {
      username
    } = mapQSToState({
      location
    });
    variables = {
      username
    };
  }

  if (!variables.userId && !variables.username && currentUserId) {
    variables = {
      userId: currentUserId
    };
  }

  return variables;
};

const ProfilePage = props => {
  const {
    user = {},
    loading: isUserLoading,
    isLoggedIn
  } = useUser();
  const currentUserId = user ? user.id : undefined;
  const queryVars = useMemo(() => {
    const newProps = _objectSpread(_objectSpread({}, props), {}, {
      currentUserId
    });

    return getQueryVariables(newProps);
  }, [props, currentUserId]);
  const {
    loading: isLoading,
    data: profile
  } = usePublicUserData(queryVars, currentUserId);
  const {
    data: followData
  } = useOldUserFollowersFollowing(queryVars);

  if (isUserLoading || isLoading) {
    return /*#__PURE__*/React.createElement(PageLoader, null);
  }

  if (!profile) {
    if (isLoggedIn) {
      return /*#__PURE__*/React.createElement("div", {
        className: cx('page', styles.page)
      }, /*#__PURE__*/React.createElement(NoProfileData, null));
    } else {
      return /*#__PURE__*/React.createElement(Redirect, {
        to: "/login"
      });
    }
  }

  function updateCache(cache, queryData) {
    updateCurrentUserFollowQueryCache(cache, queryData, queryVars, user && +user.id, undefined, currentUserId);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.page)
  }, /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(MobileHeader, {
    rightActions: /*#__PURE__*/React.createElement(ShareProfile, null),
    classes: styles
  }))), followData && /*#__PURE__*/React.createElement(ProfileInfo, {
    profile: profile,
    updateCache: updateCache,
    followData: followData
  }), /*#__PURE__*/React.createElement(ProfileActivities, {
    profileId: profile.id,
    currentUserId: currentUserId
  }));
};

const NoProfileData = () => {
  return "User does't exist";
};

export default ProfilePage;