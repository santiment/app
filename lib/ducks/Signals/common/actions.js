function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export const SIGNAL_CREATE = '[signal] CREATE_SIGNAL';
export const SIGNAL_CREATE_SUCCESS = '[signal] CREATE_SIGNAL_SUCCESS';
export const SIGNAL_CREATE_FAILED = '[signal] CREATE_SIGNAL_FAILED';
export const SIGNAL_UPDATE = '[signal] UPDATE_SIGNAL';
export const SIGNAL_UPDATE_SUCCESS = '[signal] UPDATE_SIGNAL_SUCCESS';
export const SIGNAL_UPDATE_FAILED = '[signal] UPDATE_SIGNAL_FAILED';
export const SIGNAL_FETCH_ALL_SUCCESS = '[signal] FETCH_ALL_SUCCESS'; // update signal

export const SIGNAL_TOGGLE_BY_ID = '[signal] TOGGLE_BY_ID';
export const SIGNAL_TOGGLE_SUCCESS = '[signal] TOGGLE_BY_ID_SUCCESS';
export const SIGNAL_TOGGLE_FAILED = '[signal] TOGGLE_BY_ID_FAILED';
export const SIGNAL_REMOVE_BY_ID = '[signal] REMOVE_BY_ID';
export const SIGNAL_REMOVE_BY_ID_SUCCESS = '[signal] REMOVE_BY_ID_SUCCESS';
export const SIGNAL_REMOVE_BY_ID_FAILED = '[signal] REMOVE_BY_ID_FAILED';
export const createTrigger = payload => mutateTrigger({
  payload
});
export const updateTrigger = payload => mutateTrigger({
  payload,
  isEdit: true
});

const mutateTrigger = ({
  payload,
  isEdit
}) => {
  return {
    type: isEdit ? SIGNAL_UPDATE : SIGNAL_CREATE,
    payload: _objectSpread(_objectSpread({}, payload), {}, {
      settings: JSON.stringify(payload.settings)
    })
  };
};

export const toggleTrigger = ({
  id,
  isActive
}) => ({
  type: SIGNAL_TOGGLE_BY_ID,
  payload: {
    id,
    isActive: !isActive
  }
});
export const removeTrigger = id => ({
  type: SIGNAL_REMOVE_BY_ID,
  payload: {
    id
  }
});