const express = require("express")
const person = require("./handlers/person")
const relationship = require("./handlers/relationship")
const recommendations = require("./handlers/recommendations")
const clean = require("./handlers/clean")

const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Acesse uma das rotas dispniveis')
})

app.use('/person', person)

app.use('/clean', clean)

app.use('/relationship', relationship)

app.use('/recommendations', recommendations)

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})