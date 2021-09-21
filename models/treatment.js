import { connection } from '../infra/database/connection.js'
import moment from 'moment'
import axios from 'axios'
import Repository from '../repositories/treatment.js'
const repository = new Repository

export class Treatment {

  add(treatment) {
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
      return new Promise((resolve, reject) => reject(errors))
    }
    else{
      return repository.add(datedTreatment)
        .then((result) => {
          return result
        })
    }
  }

  list() {
    return repository.list()
  }

  searchForId(id, response) {
    const sql = `SELECT * FROM Treatment WHERE id=${id}`

    connection.query(sql, async (error, result) => {
      const treatment = result[0]
      const cpf = treatment.client

      if (error) {
        response.status(400).json(error)
      }
      else {
        const {data} = await axios.get(`http://localhost:8082/${cpf}`)
        treatment.client = data
        response.status(200).json(treatment)
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