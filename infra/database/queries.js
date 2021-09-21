import { connection } from "./connection.js";

export default function queryExec(query, parms = '') {
  return new Promise((resolve, reject) => {
    connection.query(query, parms, (error, results, camps) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(results)
      }
    })
  })
}