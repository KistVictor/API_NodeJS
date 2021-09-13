import { connection } from '../infra/connection.js'

export class Treatment {
  addTreatment(treatment) {
    const sql = 'INSERT INTO Treatment SET ?'

    connection.query(sql, treatment, (error, result) => {
      if (error) {
        console.log(error)
      }
      else {
        console.log(result)
      }
    })
  }
}