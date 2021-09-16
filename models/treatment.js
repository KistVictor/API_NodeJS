import { connection } from '../infra/connection.js'
import moment from 'moment'

export class Treatment {

  addTreatment(treatment, response) {
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
      response.status(400).json(errors)
    }
    else{
      const sql = 'INSERT INTO Treatment SET ?'

      connection.query(sql, datedTreatment, (error, result) => {
        if (error) {
          response.status(400).json(error)
        }
        else {
          response.status(201).json(result)
        }
      })
    }
  }

  list(response) {
    const sql = 'SELECT * FROM Treatment'

    connection.query(sql, (error, result) => {
      if (error) {
        response.status(400).json(error)
      }
      else {
        response.status(200).json(result)
      }
    })
  }

  searchForId(id, response) {
    const sql = `SELECT * FROM Treatment WHERE id=${id}`

    connection.query(sql, (error, result) => {
      if (error) {
        response.status(400).json(error)
      }
      else {
        response.status(200).json(result[0])
      }
    })
  }

  change(id, values, response) {
    if (values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }
    const sql = 'UPDATE Treatment SET ? WHERE id=?'

    connection.query(sql, [values, id], (error, result) => {
      if (error) {
        response.status(400).json(error)
      }
      else {
        response.status(200).json({...values, id})
      }
    })
  }

  delete(id, response) {
    const sql = 'DELETE FROM Treatment WHERE id=?'

    connection.query(sql, id, (error, result) => {
      if (error) {
        response.status(400).json(error)
      }
      else {
        response.status(200).json({id})
      }
    })
  }
}