const express = require('express')
const router = express.Router()
const local = require('../config/dbconfig')

router.get('/', function (req, res) {
  try {
    let projects = local.db
      .get('projects')
      .value()
    res.status(200)
    res.json(projects)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
})

router.post('/', function (req, res) {
  try {
    let project = req.body
    console.log('POST ' + JSON.stringify(project))
    local.db
      .get('projects')
      .push(project)
      .write()
    res.status(201)
    res.json(project)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
})

router.get('/:id', function (req, res) {
  let id = req.params.id
  let project = local.db
    .get('projects')
    .find({ id: id })
    .value()
  if (project) {
    res.status(200)
    res.json(project)
  } else {
    res.status(404)
    res.json({ error: 'Resource not found' })
  }
})

router.patch('/:id', function (req, res) {
  var project = req.body
  local.db
    .get('projects')
    .find({ id: project.id })
    .assign({ name: project.name })
    .assign({ description: project.description })
    .write()
  res.status(200)
  res.json(project)
})

router.delete('/:id', function (req, res) {
  let id = req.params.id
  local.db
    .get('projects')
    .remove({ id: id })
    .write()
  console.log('DELETE: Project#' + id)
  res.status(200)
  res.json({ id: id })
})

module.exports = router
