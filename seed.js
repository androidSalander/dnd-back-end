let fs = require('fs')
let sqlite = require('sqlite3')

let db = new sqlite.Database('./database.db')

let sqlBuffer = fs.readFileSync('./seed.sql')
let sqlString = sqlBuffer.toString()

db.exec(sqlString, error => {
  if(error) console.error("SQL seed failed", error)
  else console.log("Success!")
})
