import resolveGet from './controllers/atendimentos.js'
import customExpress from './config/customExpress.js'

const app = customExpress()

resolveGet(app)

app.listen(3000, () => console.log("Server is Running"))

app.get("/", (req, res) => res.send("Server rodando"))