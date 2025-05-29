import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Contexts/AuthContexs'
import { Navigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    useEffect(() => {
        if (!loading && !user) {
            Swal.fire({
                title: 'Access Denied',
                text: 'Please login to access this page',
                icon: 'warning',
                confirmButtonText: 'Login Now',
                confirmButtonColor: '#006A71'
            })
        }
    }, [user, loading])

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-[#006A71] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/login' state={location.pathname} replace />
    }

    return children
}

export default PrivateRoute