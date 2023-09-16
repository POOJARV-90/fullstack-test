import logo from './logo.svg';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Login from './Compo/Login';
import Register from './Compo/Register';
import Addquestions from './Compo/Admin/Addquestions';
import Allquestions from './Compo/Allquestions';
import Home from './Compo/Home';
import Navbar from './Compo/Navbar';

function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route exact path="/Register" element={<Register/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/addquestions" element={<Addquestions/>}/>
        <Route exact path="/allquestions" element={<Allquestions/>}/>
        <Route exact path='/' element={<Home/>}/>
       


       

      </Routes>
     
    </div>
  );
}

export default App;
