import './Login.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useHistory } from 'react-router-dom';
import {
    // BrowserRouter as Router,
    // Switch,
    Route,
    // Link,
    Redirect
  } from "react-router-dom";

const Login = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login,setLogin] = useState("false")
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }

    const checkLogin = ()=>{
        fetch('https://money-manager-app-rohini.herokuapp.com/login',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"email":email,"password":password}),
          })
        .then(response => response.json())
        .then(data =>{
            if(data.msg==="Login success"){
                setEmail("")
                setPassword("")
                setLogin(true)
            }
        });
    }


    if(login===true){
        console.log(login)
        console.log("Welcome")
        return (
            <Route exact path="/">
                <Redirect to="/mainpage" />
            </Route>
        )
    }
    

    return (
      <div className="Login">
          <span style={{"fontSize":"14px","color":"white"}}>Use test@gmail.com and test</span>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()} onClick={checkLogin()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }


  export default Login;