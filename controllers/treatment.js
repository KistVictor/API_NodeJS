import { Treatment } from '../models/treatment.js'
const treatment = new Treatment

export default function resolveGet(app){

  app.get('/atendimento', (request, response) => {
    treatment.list(response)
  })

  app.get('/atendimento/:id', (request, response) => {
    treatment.searchForId(parseInt(request.params.id), response)
  })

  app.patch('/atendimento/:id', (request, response) => {
    treatment.change(parseInt(request.params.id), request.body, response)
  })

  app.post('/atendimento', (request, response) => {
    treatment.addTreatment(request.body, response)
  })

}