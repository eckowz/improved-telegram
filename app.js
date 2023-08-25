const express = require("express")
const person = require("./handlers/person")
const clean = require("./handlers/clean")
const relationship = require("./handlers/relationship")
const recommendations = require("./handlers/recommendations")
const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Acesse uma das rotas dispniveis')
})

app.use('/person', person)

app.use('/clean', person)

app.use('/relationship', relationship)

app.use('/recommendations', recommendations)

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})