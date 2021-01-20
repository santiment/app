import { query as Query } from '@bitquery/graph/src/index.js'

export const currenciesQuery = new Query(`
query($address: String) {
	ethereum {
    transfers(receiver: {is: $address}) {
      currency {
        name
        symbol
        address
      }
    }
  }
}`)

export const getTransfers = address =>
  currenciesQuery.request({
    address
  })

const currencyAccessor = ({ currency }) => currency
const currencyFilter = ({ name, symbol }) => name && symbol

const dataAccessor = ({ data: { ethereum } }) =>
  ethereum.transfers.map(currencyAccessor).filter(currencyFilter)
export const getCurrencyTransfers = address =>
  currenciesQuery
    .request({
      address
    })
    .then(dataAccessor)
