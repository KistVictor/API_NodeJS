import query from '../infra/database/queries.js'

export default class Treatment {
  add(treatment) {
    const sql = 'INSERT INTO Treatment SET ?'
    return query(sql, treatment)
  }

  list() {
    const sql = 'SELECT * FROM Treatment'
    return query(sql)
  }
}