const express = require('express')
const {
  getTasks, 
  getTask, 
  createTask, 
  deleteTask, 
  updateTask,
  deleteAllTasks,
  searchTask
} = require('../controllers/taskControllers')

const router = express.Router()

// GET all tasks
router.get('/', getTasks)

// GET a single task
router.get('/:id', getTask)

// POST a new task
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// GET a task with search bar 
router.get('/search/:searchTask', searchTask);

// UPDATE a task
router.patch('/:id', updateTask)

// Delete all Tasks 
router.delete('/',deleteAllTasks)

module.exports = router