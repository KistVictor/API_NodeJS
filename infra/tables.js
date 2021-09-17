export class Tables {

  init(connection) {
    this.connection = connection
    this.newTreatmentTable()
    this.newPetTable()
  }

  newTreatmentTable() {
    const sql = 'CREATE TABLE IF NOT EXISTS Treatment (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, creationDate datetime NOT NULL, status varchar(20) NOT NULL, obs text, PRIMARY KEY(id))'

    this.connection.query(sql, error => {
      if(error) {
        console.log('Treatment table not created:')
        console.log(error)
      }
      else {
        console.log('Treatment table created with sucess')
      }
    })
  }

  newPetTable() {
    const sql = 'CREATE TABLE IF NOT EXISTS Pet (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, img varchar(200), PRIMARY KEY(id))'

    this.connection.query(sql, error => {
      if(error) {
        console.log('Pet table not created:')
        console.log(error)
      }
      else {
        console.log('Pet table created with sucess')
      }
    })
  }
}