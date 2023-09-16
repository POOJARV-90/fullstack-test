import React, { useContext } from 'react'
import "../Compo/Style/Navbar.css"
import { Authcontext } from './Context/Authcontext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {state } = useContext(Authcontext)
    const router = useNavigate()
  return (
    <div id='Navbar'>
        <div id='logo'>LOGO</div>
        <div id='other'>
            <span onClick={()=>router("/Login")}>Login</span>
            <span onClick={()=>router("/Register")}> Register</span>
            <span onClick={()=>router("/addquestions")}>Add Question</span>
        </div>


    </div>
  )
}

export default Navbar