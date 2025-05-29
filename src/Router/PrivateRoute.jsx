import React, { use } from 'react'
import {AuthContext} from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user } = use(AuthContext)

    if(!user){
        <Navigate to='login'></Navigate>
    }
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute