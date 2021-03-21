import Express from 'express'
import * as os from 'os'
import * as http from 'http'
import l from './logger'

const app = new Express()

export default class ExpressServer {
  router (routes) {
    this.routes = routes
    routes(app)
    return this
  }

  listen (port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `Up and running in ${process.env.NODE_ENV ||
          'Development'} @: ${os.hostname()} on port: ${p}}`
      )
    http.createServer(app).listen(port, welcome(port))
  }
}
