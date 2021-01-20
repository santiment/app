/* eslint-env jest */
import { isEthStrictAddress, calcPercentageChange } from './utils'

describe('isEthAddress', () => {
  it('should be eth address', () => {
    expect(
      isEthStrictAddress('0x1f3df0b8390bb8e9e322972c5e75583e87608ec2')
    ).toBeTruthy()
    expect(
      isEthStrictAddress('0x140427a7d27144a4cda83bd6b9052a63b0c5b589')
    ).toBeTruthy()
  })
  it('should not be a valid eth address', () => {
    expect(isEthStrictAddress('0x1f3df0b8390bb8e9e322972c5e75582')).toBeFalsy()
    expect(
      isEthStrictAddress('1f3df0b8390bb8e9e322972c5e75583e87608ec2as')
    ).toBeFalsy()
    expect(
      isEthStrictAddress('1f3df0b8390bb8e9e322972c5e75583e87608ec2as')
    ).toBeFalsy()
    expect(isEthStrictAddress('asjdfh92ef2boejv')).toBeFalsy()
  })
})

describe('calcPercentageChange', () => {
  it('Calc percentage for 8.5 on 12', () => {
    const change = '41.18'
    const expected = calcPercentageChange(8.5, 12)
    expect(expected).toEqual(change)
  })

  it('Calc percentage for 12 on 10', () => {
    const change = '-16.67'
    const expected = calcPercentageChange(12, 10)
    expect(expected).toEqual(change)
  })

  it('Calc percentage for 13 on -2', () => {
    const change = '-115.38'
    const expected = calcPercentageChange(13, -2)
    expect(expected).toEqual(change)
  })

  it('Calc percentage for 0 on 2', () => {
    const change = 0
    const expected = calcPercentageChange(0, 2)
    expect(expected).toEqual(change)
  })
})
