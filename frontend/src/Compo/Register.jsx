import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from './ApiConfig'
import { useNavigate } from 'react-router-dom';
import "../Compo/Style/Allform.css"

const Register = () => {
    const router = useNavigate();
  
    const [ userdata , setUserdata] = useState({name:"",email:"",password:"",confirmpassword:"", role:"User" })
    const handleChange = (event) => {
      setUserdata({...userdata,[event.target.name]:event.target.value})
    }
  
    const handleRole = (event) =>{
      setUserdata({...userdata,"role":event.target.value})
    }
  
    console.log(userdata,"all data here");
  
    const handleForm = async (event) => {
      event.preventDefault();
      if (userdata.name && userdata.email && userdata.password && userdata.confirmpassword && userdata.role) {
          if (userdata.password === userdata.confirmpassword) {
              const response = await api.post("/register", { userdata });
              if (response.data.success) {
                //   setUserdata({ name: "", email: "", password: "", confirmpassword: "", role: "" })
                  router('/Login')
                  toast.success(response.data.message)
              } else {
                  toast.error(response.data.message)
              }
  
          } else {
              toast.error("Password and Confirm Password not Matched.")
          }
      } else {
          toast.error("All fields are mandtory.")
      }
  }
    return (
      <div id='body'>
  
        <form onSubmit={handleForm} >
          <label ></label> <br />
          <input placeholder='NAME' onChange={handleChange} value={userdata.name}  type="text" name='name' /> <br />
  
          <label >EMAIL</label> <br />
          <input  placeholder='EMAIL' onChange={handleChange} value={userdata.email}  type="email"  name='email'/> <br />
          
          <label>ROLE</label>   
          <select id="select" onChange={handleRole}>
            <option>role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select> <br />
           
          <label >PASSWPORD</label> <br />
          <input  onChange={handleChange} value={userdata.password} type="password" name='password' /> <br />
  
          <label >CONFIRM PASSWORD</label> <br />
          <input  onChange={handleChange} value={userdata.confirmpassword} type="password" name='confirmpassword'/> <br />
  
          <input id="button" type="submit" value="REGISTER" /> <br />
  
          <p>Already have account ? <b onClick={()=>router("/Login")}> Click here</b> </p>
  
  
        </form>
  
      </div>
    )
  }
  
  export default Register