import React, { createContext, useReducer, useEffect, useState } from 'react'
import AppReducer from './AppReducer'

// const ipcRenderer = window.require('electron').ipcRenderer

// Initial state
const initialState = {
  logs: [
    {
      id: 1,
      text: 'dfdf',
      priority: 'moderate',
      user: 'rabin',
      created: 'dsfdsfdsf'
    }
  ],
  users: [
    {
      id: 1,
      username: 'rbnph',
      user: 'Rabin'
    }
  ]
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const [sideBar, setSideBar] = useState(true)
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  })

  useEffect(() => {}, [])

  // Actions
  const deleteLog = id => {
    dispatch({
      type: 'DELETE_LOG',
      payload: id
    })

    setAlert({ show: true, message: 'Log deleted', variant: 'warning' })
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' })
    }, 3000)
  }

  const addLog = log => {
    dispatch({
      type: 'ADD_LOG',
      payload: log
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        logs: state.logs,
        users: state.users,
        alert: alert,
        sideBar: sideBar,
        setSideBar: setSideBar,
        setAlert: setAlert,
        deleteLog,
        addLog
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
