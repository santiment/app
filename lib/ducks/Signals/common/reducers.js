function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as actions from './actions';
export const initialState = {
  all: []
};

const getNewFilteredSignals = (signals, signalId) => signals.filter(({
  id
}) => id !== signalId);

export default ((state = initialState, {
  type,
  payload,
  data
}) => {
  switch (type) {
    case actions.SIGNAL_FETCH_ALL_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        all: [...state.all, ...payload.triggers]
      });

    case actions.SIGNAL_CREATE_SUCCESS:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          all: [...state.all, payload]
        });
      }

    case actions.SIGNAL_UPDATE_SUCCESS:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          all: [...state.all.map(item => item.id === payload.id ? payload : item)]
        });
      }

    case actions.SIGNAL_REMOVE_BY_ID_SUCCESS:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          all: getNewFilteredSignals(state.all, payload.id)
        });
      }

    case actions.SIGNAL_REMOVE_BY_ID_FAILED:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          all: getNewFilteredSignals(state.all, data.id)
        });
      }

    default:
      return state;
  }
});