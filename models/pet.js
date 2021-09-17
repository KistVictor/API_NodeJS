import { connection } from '../infra/connection.js'
import uploadTratament from '../archives/upload.js'

export class Pet {

  add(pet, response) {
    const sql = 'INSERT INTO Pet SET ?'

    uploadTratament(pet.img, pet.name, (error, newFolder) => {

      if (error) {
        response.status(400).json(error)
      }

      else {
        const newPet = {name: pet.name, img: newFolder}

        connection.query(sql, newPet, (error, result) => {

          if (error) {
            response.status(400).json(error)
          }

          else {
            response.status(201).json(newPet)
          }
        })
      }
    })
  }

  /*
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
  */
}