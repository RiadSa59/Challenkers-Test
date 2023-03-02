const Tasks = require('../models/Tasks')
const mongoose = require('mongoose')

// get all Tasks
const getTasks = async (req, res) => {
  const tasks = await Tasks.find({}).sort({createdAt: -1})

  res.status(200).json(tasks)
}

// get a single Task
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await task.findById(id)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// create a new Task
const createTask = async (req, res) => {
  const {name, status} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!status) {
    emptyFields.push('status')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const task = await task.create({ name, status })
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await task.findOneAndDelete({_id: id})

  if(!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await task.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// Get matching Task 
const searchTask = (req, res) => {
    const searchInput = req.params.searchInput.toLowerCase();
  
    Tasks.find({ name: { $regex: searchInput, $options: 'i' } })
      .sort({ createdAt: -1 })
      .then((matchingTasks) => res.status(200).json(matchingTasks))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

// Delete All Tasks

const deleteAllTasks = async (req, res) => {
    try {
      const result = await Tasks.deleteMany({});
      res.status(200).json({ message: 'All tasks have been deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete tasks' });
    }
  };

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  deleteAllTasks,
  searchTask
}