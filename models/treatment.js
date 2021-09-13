import { connection } from '../infra/connection.js'
import moment from 'moment'

export class Treatment {

  addTreatment(treatment, res) {
    const creationDate = moment('2021-09-13').format('YYYY-MM-DD HH:MM:SS')
    const date = moment(treatment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    const datedTreatment = {...treatment, creationDate, date}

    const validDate = moment(date).isSameOrAfter(creationDate)
    const minChar = treatment.client.length >= 4

    const validations = [
      {
        name: 'date',
        valid: validDate,
        message: `the creation date must be greater than today's date`
      },
      {
        name: 'name',
        valid: minChar,
        message: 'the number of minimum characters is 4'
      }
    ]

    const errors = validations.filter(camp => !camp.valid)
    const existErrors = errors.length

    if (existErrors) {
      res.status(400).json(errors)
    }
    else{
      const sql = 'INSERT INTO Treatment SET ?'

      connection.query(sql, datedTreatment, (error, result) => {
        if (error) {
          res.status(400).json(error)
        }
        else {
          res.status(201).json(result)
        }
      })
    }
  }
}