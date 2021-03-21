import ReckService from '../../../services/reck.service'

class ReckController {
  async getDivisible (req, res) {
    try {
      const result = await ReckService.getDivisible()
      return res.status(200)
        .send(result.join('<br/>'))
        .end()
    } catch (err) {
      res.status(404)
        .json(`${err}`)
        .end()
    }
  }

  async getTextToSearch (req, res) {
    try {
      const result = await ReckService.getTextToSearch()
      return res.status(200)
        .send(result)
        .end()
    } catch (err) {
      res.status(404)
        .json(`${err}`)
        .end()
    }
  }
}
export default new ReckController()
