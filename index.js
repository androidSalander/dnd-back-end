let express = require('express')
let db = require('./database.js')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let validate = require('./validation')
let authRequired = require('./authRequired')

let app = express()

require('dotenv').config()

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
app.get('/characters', authRequired, (req, res) => {
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
  console.log(characterId)
  const deleteCharacter = `DELETE FROM characters WHERE characters.oid = ?`

  db.all(deleteCharacter, [characterId], (error, result) => {
    if(error) {
      console.log('critical miss', error)
      res.sendStatus(500)
    } else {
      console.log('critical hit')
      res.status(200).json(`character ${characterId} successfully deleted!`)
    }
  })
})

/////////////
//USER AUTH//
////////////

// register user
app.post('/register', (req, res) => {
  let { errors, notValid } = validate(req.body)

  if (notValid) {
    return res.status(400).json({ status: 400, errors })
  }

  let verifyUser = `SELECT * FROM users WHERE users.email = ${req.body.email}`

  db.all(verifyUser, (err, verifiedUser) => {
    if (verifiedUser) {
      return res.status(400).json({
        status: 400,
        message: 'email already in use...please try again'
      })
    }
    let createNewUser = `INSERT INTO users VALUES (?, ?, ?)`
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: 'something went wrong...please try again'
        })
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'something went wrong...please try again'
          })
        }
        db.run(createNewUser, [req.body.username, req.body.email, hash], (err) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              status: 500,
              err
            })
          } else {
            res.status(201).json({
              status: 201,
              message: 'success!'
            })
          }
        })
      })
    })

  })
})

// login user
app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: 'please enter username and password'
    })
  }

  let verifyUser = `SELECT * FROM users WHERE users.username = ?`
  db.all(verifyUser, [req.body.username], (err, verifiedUser) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: 'something went wrong...please try again'
      })
    } else if (!verifiedUser) {
      return res.status(400).json({
        status: 400,
        message: 'username or password is incorrect'
      })
    } else {
      bcrypt.compare(req.body.password, verifiedUser[0].password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'something went wrong...please try again'
          })
        } else if (!isMatch) {
          return res.status(400).json({
            status: 400,
            message: 'something went wront...please try again'
          })
        } else if (isMatch) {
          let user = {
            id: verifiedUser[0].rowid
          }
          jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1hr" }, (err, signedJwt) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                message: 'something went wrong...try again'
              })
            }
            return res.status(200).json({
              status: 200,
              message: 'success',
              id: verifiedUser[0].rowid,
              signedJwt
            })
          })
        }
      })
    }
  })
})

// logout

app.listen(PORT, () => {
  console.log(`the epic tale begins on port ${PORT}`)
})
