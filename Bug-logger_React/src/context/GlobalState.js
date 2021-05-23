import React, { createContext, useReducer, useEffect, useState } from 'react'
import AppReducer from './AppReducer'
import { ipcRenderer } from 'electron'

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
    const getUsers = async () => {
      const usersJson = await fetchUsers()
      dispatch({
        type: 'FETCH_USER',
        payload: usersJson
      })
    }
    getUsers()
    ipcRenderer.send('logs:load')
    ipcRenderer.on('logs:get', (e, logs) => {
      dispatch({
        type: 'FETCH_LOG',
        payload: logs
      })
    })
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3004/users')
    const data = await res.json()
    return data
  }

  // Actions
  const deleteLog = async id => {
    await fetch(`http://localhost:3004/logs/${id}`, {
      method: 'DELETE'
    })
    dispatch({
      type: 'DELETE_LOG',
      payload: id
    })
    setAlert({ show: true, message: 'Log deleted', variant: 'warning' })
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' })
    }, 3000)
  }

  const editLog = async (id, text, priority, user, created) => {
    await fetch(`http://localhost:3004/logs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id, text, priority, user, created })
    })
    dispatch({
      type: 'EDIT_LOG',
      payload_id: id,
      payload_text: text,
      payload_priority: priority,
      payload_user: user,
      payload_created: created
    })
  }

  const addLog = async log => {
    const res = await fetch('http://localhost:3004/logs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(log)
    })
    const data = await res.json()
    dispatch({
      type: 'ADD_LOG',
      payload: data
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
        editLog,
        addLog
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
