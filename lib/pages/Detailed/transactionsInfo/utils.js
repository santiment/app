function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getDateFormats, getTimeFormats } from '../../../utils/dates';
import { isEthStrictAddress, isEthStrictHashTx } from '../../../utils/utils';
const ETHEREUM = 'ethereum';
export function normalizeTransactionData(slug, {
  datetime,
  trxValue,
  trxHash,
  fromAddress,
  toAddress
}) {
  const targetDate = new Date(datetime);
  const {
    YYYY,
    MMM,
    DD
  } = getDateFormats(targetDate);
  const {
    HH,
    mm,
    ss
  } = getTimeFormats(targetDate);
  const isEth = isEthStrictAddress(fromAddress) || isEthStrictHashTx(trxHash);
  const listSlugs = isEth && slug !== ETHEREUM ? [slug, ETHEREUM] : [slug];
  return {
    trxHash,
    trxValue,
    fromAddress: _objectSpread(_objectSpread({}, fromAddress), {}, {
      assets: listSlugs
    }),
    toAddress: _objectSpread(_objectSpread({}, toAddress), {}, {
      assets: listSlugs
    }),
    datetime: `${MMM} ${DD}, ${YYYY} ${HH}:${mm}:${ss}`
  };
}