const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

let init = function () {
  db.defaults({
    teams: [],
    projects: []
  }).write()
}

module.exports = {
  init: init,
  db: db
}
