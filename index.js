import resolveGet from './controllers/treatment.js'
import customExpress from './config/customExpress.js'
import { connection } from './infra/connection.js'
import { Tables } from './infra/tables.js'

connection.connect((error) => {
  if (error) {
    console.log(error)
  }
  else {
    console.log("connected")
    const app = customExpress()
    app.listen(3000, () => console.log("Server is Running"))
    const tables = new Tables
    tables.init(connection)
    resolveGet(app)
  }
})