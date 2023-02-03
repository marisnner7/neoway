import React, { useState, useEffect, Fragment } from 'react'
import API from '../../services/API'
import UserDialog from './Form/UserDialog'
import Table from './Table'
const Home = () => {
  useEffect(() => { getUsers() }, [])
  const [users, setUsers] = useState([])
  const getUsers = () => {
    API.get('/users').then((res) => { setUsers(res.data) })
  }
  return (
    < Fragment>
      <br />
      <h1> CRUD Users </h1><Table getUsers={getUsers} users={users} /><UserDialog getUsers={getUsers} />
    </ Fragment>
  )
}
export default Home