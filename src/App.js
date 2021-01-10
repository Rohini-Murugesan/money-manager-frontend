// import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js'
import Mainpage from './components/Main.js'
import Expense from './components/Expense.js'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <div>
        <nav>
          <button className="d-inline p-2 ml-2 mr-4 mt-2 btn btn-primary btn-danger float-right">
            <Link to="/" className="Link">Home</Link>
          </button>
          <button className="d-inline p-2 ml-4 mt-2 btn btn-primary btn-danger float-right">
            <Link to="/about" className="Link">About</Link>
          </button>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/mainpage">
            <Mainpage />
            <Expense/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </header>
    </div>
  );
}
const Header = ({className}) => {
  return (
      <div className={className} style={{"fontSize":"50px"}}>
          MONEY MANAGER APP
      </div>

  )
}

function Home() {
  return <div>
          <Header className="text-light"></Header>
          <Login></Login>
  </div>;
}

function About() {
  return (
    <div className="container">
      <Header className="m-3 text-center text-danger font-weight-bold"></Header>
        <img className="img-fluid m-5" alt="" src="./Images/Bill.jpg" height="200px" width="200px" style={{ "borderRadius": "10px" }}></img>
          <p className="text-danger" >
            Money manager is an application where you can manage your financial things. 
            Using this application the user can easily record your personal and business financial transactions, generate spending reports, review your daily, weekly and monthly financial data and manage your assets with Money Manager's spending tracker and budget planner.
          </p>
        </div>
);
}


export default App;
