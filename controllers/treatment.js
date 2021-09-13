import { Treatment } from '../models/treatment.js'
const treatment = new Treatment

export default function resolveGet(app){

  app.get('/atendimento', (req, res) => {
    res.send('[GET /atendimento] Service Atendimento.')
  })

  app.post('/atendimento', (req, res) => {
    treatment.addTreatment(req.body)
    res.send(req.body)
  })

}