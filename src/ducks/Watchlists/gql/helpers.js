const normalizeItem = ({ blockchainAddress: { address, infrastructure } }) => ({
  blockchainAddress: {
    address,
    infrastructure
  }
})
export const normalizeItems = items => items.map(normalizeItem)
