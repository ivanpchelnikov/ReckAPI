import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Divisible from '../src/services/divisible.service'
const expect = chai.expect
chai.use(chaiAsPromised)

describe('Divisible class', () => {
  const rangeInfo = { lower: 0, upper: 10 }
  const divisorInfo = {
    outputDetails: [{ divisor: 3, output: 'Bob' },
      { divisor: 2, output: 'Joe' },
      { divisor: 20, output: 'Ann' }]
  }
  const result = Divisible.getDivisibleList(rangeInfo, divisorInfo)
  describe('Return will contains same length', () => {
    it('should return an array where with the same size', async () => {
      expect(await result).to.have.lengthOf(rangeInfo.upper + 1)
    })
  })
  describe('Return will contains Bob', () => {
    it('should return an array where with expected name', async () => {
      expect(await result).to.contain.members(['3: Bob'])
    })
  })
  describe('0 will contains all names BobJoeAnn', () => {
    it('should return an array where with expected name', async () => {
      expect(await result).to.contain.members(['0: BobJoeAnn'])
    })
  })
  describe('Input upper < lower will return empty output', () => {
    const rangeInfo = { lower: 10, upper: 0 }
    const divisorInfo = {
      outputDetails: [{ divisor: 3, output: 'Bob' },
        { divisor: 2, output: 'Joe' },
        { divisor: 20, output: 'Ann' }]
    }
    it('should return an array with 0 length', async () => {
      const result = await Divisible.getDivisibleList(rangeInfo, divisorInfo)
      expect(result).to.have.lengthOf(0)
    })
  })
  describe('No divisors exist, call rejected', () => {
    const rangeInfo = { lower: 0, upper: 10 }
    const divisorInfo = { }
    it('works with rejected promises', async () => {
      return expect(Divisible.getDivisibleList(rangeInfo, divisorInfo)).to.be.rejected
    })
  })
  describe('No range exist will return emty erray', () => {
    const rangeInfo = { }
    const divisorInfo = {
      outputDetails: [{ divisor: 3, output: 'Bob' },
        { divisor: 2, output: 'Joe' },
        { divisor: 20, output: 'Ann' }]
    }
    it('works with resolved and rejected promises', async () => {
      const result = await Divisible.getDivisibleList(rangeInfo, divisorInfo)
      expect(result).to.have.lengthOf(0)
    })
  })
})
