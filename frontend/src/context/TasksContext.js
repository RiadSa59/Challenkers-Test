import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { 
        tasks: action.payload 
      }
    case 'CREATE_TASKS':
      return { 
        tasks: [action.payload, ...state.tasks] 
      }
    case 'DELETE_TASKS':
      return { 
        tasks: state.tasks.filter(w => w._id !== action.payload._id) 
      }
    case 'UPDATE_TASKS':
        const updatedTasks = state.tasks.map((task) => {
          if (task._id === action.payload._id) {
            return { ...task, ...action.payload }
          }
          return task
        })
        return {
          tasks: updatedTasks
        }
    case 'SEARCH_TASKS':
        return{
            tasks:action.payload
        }
    case 'DELETE_ALL':
        return {
            tasks:action.payload
        }
    default:
      return state
  }
}

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { 
    tasks: null
  })
  
  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TasksContext.Provider>
  )
}