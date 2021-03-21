import router from '../api/controllers/application/router'

export default function routes (app) {
  app.use('/', router)
}
