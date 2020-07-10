import { hasAssetById } from './WatchlistsPopup'

describe('hasListItemsThisAssetById', () => {
  it('should return false if we dont have item in the list', () => {
    expect(
      hasAssetById({
        listItems: [],
        id: '736'
      })
    ).toEqual(false)
  })

  it('should return true if we have item in the list', () => {
    expect(
      hasAssetById({
        listItems: [
          {
            id: '736',
            __typename: 'ListItem'
          }
        ],
        id: '736'
      })
    ).toEqual(true)

    expect(
      hasAssetById({
        listItems: [
          {
            id: '736',
            __typename: 'ListItem'
          },
          {
            id: '716',
            __typename: 'ListItem'
          }
        ],
        id: '736'
      })
    ).toEqual(true)
  })
})
