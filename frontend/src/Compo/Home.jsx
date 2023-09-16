import React, { useContext } from 'react'
import { Authcontext } from './Context/Authcontext'

const Home = () => {
const {state}=useContext(Authcontext)
console.log(state);
  return (
    <div>Home</div>
  )
}

export default Home