import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function EmployeeLogin() {
const [name, setname] = useState()
const [password, setpassword] = useState()

const navigate = useNavigate();
  const submitHandler = (e) =>{
    e.preventDefault();
    // axios.get("http://localhost:8080/employee/")
    // .then(res=>console.log(res))
    // .catch(err=>console.log(err))
    axios.post(
      "http://localhost:8080/employee/add",
      {
        employeename: name,
        employeepassword:password 
    }
  )
    .then((res)=>{console.log(res)
    navigate("/home")}
    )
    .catch(err=>console.log(err))
  }


  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your Name" onChange={(e)=>{setname(e.target.value)}}  />
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
    </Form>
  );
}

// export default BasicExample;

export default EmployeeLogin;
