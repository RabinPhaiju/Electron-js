import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
// import Alert from 'react-bootstrap/Alert'
import './Sidebar.css'
import ham from './ham.png'
import home from './home.png'

import { GlobalContext } from '../../context/GlobalState'

const Header = () => {
  const { users, sideBar, setSideBar } = useContext(GlobalContext)
  const user = users.length > 0 ? users[0].user : ''

  const onClick = () => {
    setSideBar(!sideBar)
  }

  return (
    <div className="leftMenu" style={{ width: sideBar ? '200px' : '40px' }}>
      <div className="itemtop">
        <Link className="item-home" to="/">
          <img src={ham} alt="ham" height="20px" onClick={onClick} />
        </Link>
        <span> &nbsp;&nbsp;&nbsp;{user}</span>
      </div>
      <div className="itemlist">
        <Link className="item" to="/">
          <img src={home} alt="" height="20px" />
          &nbsp;&nbsp;&nbsp;&nbsp;Home
        </Link>
        <Link className="item" to="/add">
          <img src={home} alt="" height="20px" />
          &nbsp;&nbsp;&nbsp;&nbsp;Add
        </Link>
        <Link className="item" to="list">
          <img src={home} alt="" height="20px" />
          &nbsp;&nbsp;&nbsp;&nbsp;Logs
        </Link>
      </div>
    </div>
  )
}

export default Header
