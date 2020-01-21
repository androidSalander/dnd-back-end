let express = require('express')
let db = require('./database.js')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let app = express()

app.use(express.json())

let setCORS = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE")
  next()
}
app.use(setCORS)

const PORT = 9000

/////////////////////
//CHARACTERS ROUTES//
////////////////////

//get all characters ✅
app.get('/characters', (req, res) => {
  const getCharacters = 'SELECT oid, * FROM characters'

  db.all(getCharacters, (error, results) => {
    if(error) {
      console.log('critical miss', error)
      res.sendStatus(500)
    } else {
      console.log('critical hit')
      res.status(200).json(results)
    }
  })
})

//get one character ✅
app.get('/characters/:id', (req, res) => {
  const characterId = req.params.id
  const getOneCharacter =
  `SELECT oid, * FROM characters
  WHERE characters.oid = ${characterId}`

  db.all(getOneCharacter, (error, results) => {
    if(error) {
      console.log('critical miss', error)
      res.sendStatus(500)
    } else {
      console.log('critical hit')
      res.status(200).json(results)
    }
  })
})

//post new character ✅
app.post('/characters', (req, res) => {
  const postCharacter =
  `INSERT INTO characters VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )`
  const newCharacter = [
    req.body.name,
    req.body.class,
    req.body.race,
    req.body.gender,
    req.body.size,
    req.body.age,
    req.body.language,
    req.body.speed,
    req.body.strength,
    req.body.dexterity,
    req.body.constitution,
    req.body.intelligence,
    req.body.wisdom,
    req.body.charisma,
    req.body.hit_points,
    req.body.hit_dice
  ]

  db.all(postCharacter, newCharacter, (error, results) => {
    if(error) {
      console.log('critical miss', error)
      res.sendStatus(500)
    } else {
      console.log('critical hit')
      res.status(200).json(newCharacter)
    }
  })
})

//update character ✅
app.put('/characters/:id', (req, res) => {
  const characterId = req.params.id
  const characterToUpdate = [
    req.body.name,
    req.body.class,
    req.body.race,
    req.body.gender,
    req.body.size,
    req.body.age,
    req.body.language,
    req.body.speed,
    req.body.strength,
    req.body.dexterity,
    req.body.constitution,
    req.body.intelligence,
    req.body.wisdom,
    req.body.charisma,
    req.body.hit_points,
    req.body.hit_dice
  ]

  const updateCharacter =
  `UPDATE characters
  SET name = ?,
  class = ?,
  race = ?,
  gender = ?,
  size = ?,
  age = ?,
  language = ?,
  speed = ?,
  strength = ?,
  dexterity = ?,
  constitution = ?,
  intelligence = ?,
  wisdom = ?,
  charisma = ?,
  hit_points = ?,
  hit_dice = ?
  WHERE characters.oid = ${characterId}`

  db.all(updateCharacter, characterToUpdate, (error, results) => {
    if(error) {
      console.log('critical miss', error)
      res.sendStatus(500)
    } else {
      console.log('critical hit')
      res.status(200).json(`character ${characterId} successfully updated!`)
    }
  })
})

//delete character ✅
app.delete('/characters/:id', (req, res) => {
  const characterId = req.params.id
  const deleteCharacter =
  `DELETE FROM characters
  WHERE characters.oid = ${characterId}`

  db.all(deleteCharacter, (error, result) => {
    if(error) {
      console.log('critical miss', error)
      res.sendStatus(500)
    } else {
      console.log('critical hit')
      res.status(200).json(`character ${characterId} successfully deleted!`)
    }
  })
})


app.listen(PORT, () => {
  console.log(`the epic tale begins on port ${PORT}`)
})
