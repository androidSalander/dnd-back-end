let sqlite = require('sqlite3')
let db = new sqlite.Database('./database.db')

///////////////
//TABLE SETUP//
//////////////

const charactersTableQuery =
`CREATE TABLE IF NOT EXISTS characters (
  name TEXT,
  class TEXT,
  race TEXT,
  gender TEXT,
  size TEXT,
  age INTEGER,
  language TEXT,
  speed INTEGER,
  strength INTEGER,
  dexterity INTEGER,
  constitution INTEGER,
  intelligence INTEGER,
  wisdom INTEGER,
  charisma INTEGER,
  hit_points INTEGER,
  hit_dice TEXT)`

const usersTableQuery =
`CREATE TABLE IF NOT EXISTS users (
  username TEXT,
  email TEXT,
  password TEXT
)`

  db.run(charactersTableQuery, error => {
    if(error) console.log("critical hit - character table down")
    else console.log("critical success - character table created")
  })

  db.run(usersTableQuery, error => {
    if(error) console.log("critical hit - user table down")
    else console.log("critical success - user table created")
  })

  module.exports = db
