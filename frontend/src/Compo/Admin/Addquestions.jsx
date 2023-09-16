import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { useNavigate } from 'react-router-dom';
import api from '../ApiConfig';

const  Addquestions = () => {
    const router = useNavigate();
  
    const [ questiondata , setQuestiondata] = useState({question:"" , answer:"" })
    const handleChange = (event) => {
        setQuestiondata({...questiondata,[event.target.name]:event.target.value})
    }
  
   
  
    const handleForm = async (event) => {
        event.preventDefault();
        if (questiondata.question && questiondata.answer ) {
            const token = JSON.parse(localStorage.getItem("token"))
            try {
                const response = await api.post("/add-question", { token, questiondata });
                if (response.data.success) {
                    
                    toast.success("ADDED")
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
  }
    return (
      <div id='body' >
  
        <form onSubmit={handleForm} >
          <label ></label> <br />
          <input placeholder='Question' onChange={handleChange} value={questiondata.question}  type="text" name='question' /> <br />
  
          <label >ANSWER</label> <br />
          <input  placeholder='ANSWER' onChange={handleChange} value={questiondata.answer}  type="text"  name='answer'/> <br />
          
          
  
          <input id="button" type="submit" value="SET QUESTIONS" /> <br />

        </form>
  
      </div>
    )
  }
  
  export default Addquestions