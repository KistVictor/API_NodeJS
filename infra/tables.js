export class Tables {

  init(connection) {
    this.connection = connection
    this.newTreatment()
  }

  newTreatment() {
    const sql = 'CREATE TABLE IF NOT EXISTS Treatment (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, obs text, PRIMARY KEY(id))'

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
}