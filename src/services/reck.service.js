
import Divisible from './divisible.service'
import TextToSearch from './testToSearch.service'
import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 5 })

class ReckService {
  async getDivisible () {
    const [rangeInfo, divisorInfo] =
      await Promise.all([
        axios.get(process.env.reckon_rangeInfo),
        axios.get(process.env.reckon_divisorInfo)])
    return Divisible.getDivisibleList(rangeInfo.data, divisorInfo.data)
  }

  async getTextToSearch () {
    const [textToSearch, subTexts] =
      await Promise.all([
        axios.get(process.env.reckon_textToSearch),
        axios.get(process.env.reckon_subTexts)])
    const results = await TextToSearch.getTextToSearch(textToSearch.data, subTexts.data)
    const output = await axios.post(process.env.reckon_submitResults, results)
    return {results, output: output.data}
  }
}
export default new ReckService()
