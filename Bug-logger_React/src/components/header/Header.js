import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import './Header.css'

import { GlobalContext } from '../../context/GlobalState'

const Header = () => {
  const { alert, users } = useContext(GlobalContext)
  const user = users.length > 0 ? users[0].user : ''
  return (
    <div>
      <div className="headerStype">
        <div className="itemStype">
          <Link className="item-home" to="/">
            Bug Logger
          </Link>
          &nbsp;
          {user}
        </div>
        <div className="itemStype">
          <Link className="item" to="/">
            Home
          </Link>
          <Link className="item" to="/add">
            Add
          </Link>
          <Link className="item" to="list">
            Logs
          </Link>
        </div>
      </div>
      {alert.show && (
        <Alert className="alertStyle" variant={alert.variant}>
          {alert.message}
        </Alert>
      )}
    </div>
  )
}

export default Header
