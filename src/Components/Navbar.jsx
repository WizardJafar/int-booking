import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';


const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log("user", user);

  const handleLogout = async () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className="navbar bg-gradient-to-r from-base-100 to-base-200 shadow-lg px-2 sm:px-4 border-b-2 border-primary/20">
      <div className="navbar-start">
        <div className='flex items-center'>
          <p className="text-2xl sm:text-3xl font-bold text-primary drop-shadow-lg">
            Int-Booking
          </p>
        </div>
      </div>

      <div className="navbar-center hidden md:flex rounded-2xl shadow-lg border-2 border-primary/30 bg-gradient-to-br from-base-100 to-primary/5 backdrop-blur-sm p-1">
        <ul className="flex py-2 px-5 gap-4">
          <li className='hover:text-primary transition-all hover:scale-110 text-sm lg:text-base font-semibold cursor-pointer hover:drop-shadow-md'>
            <Link to='/Profile'>Profile</Link>
          </li>
          <li className='hover:text-primary transition-all hover:scale-110 text-sm lg:text-base font-semibold cursor-pointer hover:drop-shadow-md'>
            <Link to='/Project'>Project</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <button onClick={handleLogout} className="btn btn-error btn-sm sm:btn-md rounded-lg shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm font-bold border-2 border-error/30 flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Navbar;    