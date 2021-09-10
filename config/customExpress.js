import express from 'express'
import bodyParser from 'body-parser'

export default function customExpress() {
  const app = express()
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  return app
}