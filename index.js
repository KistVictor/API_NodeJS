import treatment from './controllers/treatment.js'
import pet from './controllers/pet.js'
import customExpress from './config/customExpress.js'
import { connection } from './infra/database/connection.js'
import { Tables } from './infra/database/tables.js'

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

    treatment(app)
    pet(app)
  }
})