import React, { createContext, useReducer, useEffect, useState } from 'react'
import AppReducer from './AppReducer'

const ipcRenderer = window.require('electron').ipcRenderer

// Initial state
const initialState = {
  logs: [],
  users: []
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  })

  useEffect(() => {
    const getUsers = () => {
      ipcRenderer.send('users:load')
      ipcRenderer.on('users:get', (e, users) => {
        dispatch({
          type: 'FETCH_USER',
          payload: users
        })
      })
    }

    const getLogs = () => {
      ipcRenderer.send('logs:load')
      ipcRenderer.on('logs:get', (e, logs) => {
        dispatch({
          type: 'FETCH_LOG',
          payload: logs
        })
      })
    }
    getUsers()
    getLogs()
  }, [])

  // Actions
  const deleteLog = id => {
    ipcRenderer.send('logs:delete', id)
    ipcRenderer.on('logs:deleted', e => {
      dispatch({
        type: 'DELETE_LOG',
        payload: id
      })

      setAlert({ show: true, message: 'Log deleted', variant: 'warning' })
      setTimeout(() => {
        setAlert({ show: false, message: '', variant: 'success' })
      }, 3000)
    })
  }

  const addLog = log => {
    ipcRenderer.send('logs:add', log)
    ipcRenderer.on('logs:added', e => {
      dispatch({
        type: 'ADD_LOG',
        payload: log
      })
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        logs: state.logs,
        users: state.users,
        alert: alert,
        setAlert: setAlert,
        deleteLog,
        addLog
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
