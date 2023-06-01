import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { clearState } from '../slices/loginSlice';

export default function Header() {
  let {status}=useSelector((state)=>state.login);
  //Dispacter 
  let dispatch=useDispatch()
  //Calling the clearState method for removing token
  let logout=()=>{
    sessionStorage.removeItem("token")
    dispatch(clearState())
  }
  return (
    <div>
      {status==="success"?(
        //On successfull login 
        <ul className="nav justify-content-end bg-dark p-2">
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/" onClick={logout}>
            Logout
          </NavLink>
        </li>
        </ul>
      ):(
      <ul className="nav justify-content-end bg-dark p-2">
          <li className="nav-item">
            <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/" >
              Login
            </NavLink>
          </li>
        </ul>)}
    </div>
  )
}
