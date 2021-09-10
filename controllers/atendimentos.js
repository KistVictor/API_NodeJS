export default function resolveGet(app){
  app.get('/atendimento', (req, res) => {
    res.send('[GET /atendimento] Service Atendimento.');
  })
  app.post('/atendimento', (req, res) => {
    console.log(req.body)
    res.send('[post /atendimento] Service Atendimento.');
  })
}