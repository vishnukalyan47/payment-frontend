import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer , toast} from 'react-toastify';

function EmployeeLogin() {
const [name, setname] = useState()
const [password, setpassword] = useState()
// useEffect(() => {
//    if(sessionStorage.getItem("session")){
//   toast("Please Logout from other payment page")
// }
// },[])

const navigate = useNavigate();
const inRange = (num, num1, num2) => Math. min(num1, num2) <= num && Math. max(num1, num2) >= num;

  const submitHandler = (e) =>{
    e.preventDefault();
 
    if(password===undefined || name===undefined) return toast("Enter ID or Password")
    if(password.length!=6 || name.length!=6 || !inRange(name, 100000, 600000)) return toast("Incorrect ID or Password");
    
    //create a session here
    sessionStorage.setItem("session", "***");
    navigate("/home");
}

  const employeeIDhandler = (e) =>{
    setname(e.target.value)
  }


  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control type="number" placeholder="Enter your Name" onChange={e=> employeeIDhandler(e)}  />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value); }}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={(e)=>submitHandler(e)}>
        Submit
      </Button>
      <ToastContainer />
    </Form>
  );
}


export default EmployeeLogin;

