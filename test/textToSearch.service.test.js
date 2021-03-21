import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TextToSearch from '../src/services/testToSearch.service'
const expect = chai.expect
chai.use(chaiAsPromised)

describe('TextToSearch class', () => {
  const textToSearch =
      {
        text: 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!pi'
      }
  const subTexts = { subTexts: ['Peter', 'peter', 'Pick', 'Pi', 'Z'] }
  const result = TextToSearch.getTextToSearch(textToSearch, subTexts)
  describe('Return will contains same length as subTexts', () => {
    it('should return an array where with the same size', async () => {
      expect((await result).results).to.have.lengthOf(5)
    })
  })
  describe('Peter will be found in multiple places', () => {
    it('should return be found in 3 positions', async () => {
      const expectName = 'Peter'
      expect((await result).results.find(r => r.subtext === expectName).result).to.be.equals('1,43,98')
    })
  })
  describe('Lowcase peter will be found in multiple places', () => {
    it('should return be found in the same 3 positions', async () => {
      const expectName = 'peter'
      expect((await result).results.find(r => r.subtext === expectName).result).to.be.equals('1,43,98')
    })
  })
  describe('Pi will not be found at the end', () => {
    it('should return be found in the same 5 positions', async () => {
      const expectName = 'Pi'
      expect((await result).results.find(r => r.subtext === expectName).result).to.be.equals('53,60,66,74,81,116')
    })
  })
  describe('No subtext will return empty output', () => {
    const textToSearch =
        {
          text: 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!pi'
        }
    const subTexts = { subTexts: [] }
    it('should return an array with 0 length', async () => {
      const result = await TextToSearch.getTextToSearch(textToSearch, subTexts)
      expect(result.results).to.have.lengthOf(0)
    })
  })
  describe('No text will return No output', () => {
    const textToSearch =
        {
          text: ''
        }
    const subTexts = { subTexts: ['Pi'] }
    const expectName = 'Pi'
    it('should return an array with <No output> values', async () => {
      const result = await TextToSearch.getTextToSearch(textToSearch, subTexts)
      expect(result.results.find(r => r.subtext === expectName).result).to.equals('<No Output>')
    })
  })
  describe('No text will return rejected', () => {
    const textToSearch = {}
    const subTexts = { subTexts: ['Pi'] }
    it('works with rejected promises', async () => {
      return expect(TextToSearch.getTextToSearch(textToSearch, subTexts)).to.be.rejected
    })
  })
  describe('No subTexts will return rejected', () => {
    const textToSearch =
        {
          text: ''
        }
    const subTexts = { }
    it('works with rejected promises', async () => {
      return expect(TextToSearch.getTextToSearch(textToSearch, subTexts)).to.be.rejected
    })
  })
})
