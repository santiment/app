function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useUser } from '../../stores/user';
import { isInFollowers } from '../../pages/profile/follow/FollowBtn';
import { useOldUserFollowersFollowing } from '../../queries/ProfileGQL';
const NOTIFICATIONS_FOLLOWERS_QUERY = gql`
  {
    currentUser {
      id
      following2 {
        users {
          userId
          isNotificationDisabled
        }
      }
    }
  }
`;
export const useFollowers = () => {
  const query = useQuery(NOTIFICATIONS_FOLLOWERS_QUERY);
  return useMemo(() => {
    const {
      data,
      loading,
      error
    } = query;
    return {
      data: data && data.currentUser ? data.currentUser : undefined,
      loading,
      error
    };
  }, [query]);
};
export const NOTIFICATIONS_ENABLE_MUTATION = gql`
  mutation followingToggleNotification($userId: ID!, $disableNotifications: Boolean) {
    followingToggleNotification(userId: $userId, disableNotifications: $disableNotifications) {
      following2 {
        users {
          userId
          isNotificationDisabled
        }
      }
    }
  }
`;

function buildCacheUpdater(reducer) {
  return (cache, {
    data
  }) => {
    const {
      currentUser
    } = cache.readQuery({
      query: NOTIFICATIONS_FOLLOWERS_QUERY
    });
    cache.writeQuery({
      query: NOTIFICATIONS_FOLLOWERS_QUERY,
      data: {
        currentUser: _objectSpread(_objectSpread({}, currentUser), reducer(data))
      }
    });
  };
}

const updateFollowersOnToggle = buildCacheUpdater(({
  followingToggleNotification: {
    following2
  }
}) => {
  return {
    following2
  };
});
export function useEnableNotifications() {
  const [mutate, {
    loading
  }] = useMutation(NOTIFICATIONS_ENABLE_MUTATION, {
    update: updateFollowersOnToggle,
    notifyOnNetworkStatusChange: true
  });

  function toggle(id, on) {
    return mutate({
      variables: {
        userId: +id,
        disableNotifications: on
      }
    });
  }

  return {
    toggle,
    loading
  };
}
export const useNotificationToggle = targetUserId => {
  const {
    data,
    loading
  } = useFollowers();
  const followingInfo = useMemo(() => {
    return data && data.following2.users.find(({
      userId,
      isNotificationDisabled
    }) => +userId === +targetUserId);
  }, [data]);
  const {
    toggle,
    loading: toggleRequestSending
  } = useEnableNotifications();
  const {
    isNotificationDisabled
  } = followingInfo || {};
  const disabledBtn = loading || toggleRequestSending;
  return {
    toggle,
    isNotificationDisabled,
    disabledBtn
  };
};
export const useIsInFollowers = targetUserId => {
  const {
    user: currentUser
  } = useUser();
  const {
    data: {
      following
    }
  } = useOldUserFollowersFollowing({
    userId: currentUser && currentUser.id
  });
  const usersList = useMemo(() => {
    if (!following || !following.users) {
      return [];
    } else {
      return following.users;
    }
  }, [following]);
  return useMemo(() => {
    if (!currentUser) {
      return false;
    }

    return isInFollowers(usersList, targetUserId, currentUser.id);
  }, [usersList, targetUserId, currentUser]);
};