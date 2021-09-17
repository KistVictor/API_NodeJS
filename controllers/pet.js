import { Pet } from '../models/pet.js'
const pet = new Pet

export default function resolveGet(app){

  app.get('/pet', (request, response) => {
    response.send("ok")
  })

  app.post('/pet', (request, response) => {
    pet.add(request.body, response)
  })

}