class Divisible {
  rangeLoweUpper (rangeInfo, divisorInfo) {
    const result = []
    for (let i = rangeInfo.lower; i <= rangeInfo.upper; i++) {
      result.push(`${i}: ${this.checkDivisors(i, divisorInfo)}`)
    }
    return result
  }

  checkDivisors (i, divisorInfo) {
    return divisorInfo.outputDetails.reduce((find, div) => {
      if (i % div.divisor === 0) {
        find = find + div.output
      }
      return find
    }, '')
  }

  getDivisibleList (rangeInfo, divisorInfo) {
    return new Promise((resolve, reject) => {
      if (divisorInfo.outputDetails && rangeInfo) {
        const divisibleList = this.rangeLoweUpper(rangeInfo, divisorInfo)
        return resolve(divisibleList)
      } else {
        return reject(new Error('Input failed.'))
      }
    })
  }
}
export default new Divisible()
