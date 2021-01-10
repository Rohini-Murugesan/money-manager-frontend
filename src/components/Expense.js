import './Main.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
    Route,
    Redirect
  } from "react-router-dom";

  // const Mainpage = ()=>{

  // }
  const Header = () => {
    return (
        <div className="m-3 header text-center">
            Expense
        </div>

    )
}
  const Expense = () => {
    const [expenseList, setexpenseList] = React.useState([]); //counts will be initialized as a list - [0]
    const [expense_category, setexpenseCategory] = React.useState("");
    const [expense_description, setexpense_description] = React.useState("");
    const [expense_amt, setexpenseAmt] = React.useState("");
    const [Date,setDate] = React.useState("");
    const [expense_division, setexpense_division] = React.useState("");

    const [filterOption, setfilterOption] = React.useState("all")
    const [editexpense, seteditexpense] = React.useState(false)

    const getAllexpense = ()=>{
      fetch('https://money-manager-app-rohini.herokuapp.com/expense/allDetails/1')
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        setexpenseList(data.data)
      });
  }
  const addExpense = ()=>{
    fetch('https://money-manager-app-rohini.herokuapp.com/expense/add',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "expense_category":expense_category,
          "expense_amt":expense_amt,
          "expense_description": expense_description,
          "userId" : 1,
          "Date" : Date,
          "expense_division": expense_division
        }),
      })
    .then(response => response.json())
    .then(data =>{
      console.log(data.msg)
      if(data.msg === "Expense added successfully"){
        alert(data.msg)
      }else{
        alert("Oops! "+data.msg+" Try Again!")
      }
    });
}

const updateExpense = ()=>{
  fetch('https://money-manager-app-rohini.herokuapp.com/expense/edit',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "expense_category":expense_category,
        "expense_amt":expense_amt,
        "expense_description": expense_description,
        "userId" : 1,
        "Date" : Date,
        "Expense_ID" :editexpense,
        "expense_division": expense_division
      }),
    })
  .then(response => response.json())
  .then(data =>{
    console.log(data.msg)
    if(data.msg === "expense updated successfully"){
      alert(data.msg)
      getAllexpense()
    }else{
      alert("Oops! "+data.msg)
    }
  });
}

const deleteexpense = (index)=>{
  fetch('https://money-manager-app-rohini.herokuapp.com/expense/delete',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userId" : 1,
        "Expense_ID" :index
      }),
    })
  .then(response => response.json())
  .then(data =>{
    console.log(data.msg)
    if(data.msg === "Record Deleted"){
      alert(data.msg)
      getAllexpense()
    }else{
      alert("Oops! "+data.msg)
    }
  });
}

    const addexpense = () => {
        if (expense_category === "" || expense_description === "" || expense_amt === "" || Date==="" ) {
            alert("Empty Input Not Accepted!!")
        } else {
            addExpense()
        }
        setexpenseCategory("")
        setexpense_description("")
        setexpenseAmt("")
        setDate("")
    }
    const handlesetexpenseCategory = (event) => {
        console.log(event.target.value)
        setexpenseCategory(event.target.value);
    };
    const handleexpense_division = (event) => {
      console.log(event.target.value)
      setexpense_division(event.target.value);
  };

    const handleexpense_description = (event) => {
      setexpense_description(event.target.value);
    };

    const handlesetexpenseAmt = (event) => {
      console.log(event.target.value)
      setexpenseAmt(event.target.value);
  };

  const handlesetDate = (event) => {
    setDate(event.target.value);
  };


    const filter = (type) => {
        setfilterOption(type)
    }


    const Button = (props) => {
        return (<button className={props.className} onClick={props.onClick} >{props.text}</button>)
    }

    const Filter = () => {
        return (<div>
            <Button className="btn btn-light m-1"
                onClick={() => getAllexpense()}
                text="Display All expenses" ></Button>
        </div>)
    }

    const updateexpense = (index) => {
        seteditexpense(index)
    }

    const ExpenseHeader = ({ text, index }) => {
        return (<div className="card-header text-dark font-weight-bold p-1">expense Category : {text.expense_category} &nbsp; &nbsp;
            <Button className="btn btn-outline-danger float-right"
                onClick={() => deleteexpense(text.Expense_ID)}
                text={<i className="far fa-trash-alt"></i>} ></Button>
            <Button className="btn btn-outline-secondary float-right mr-1"
                onClick={() => updateexpense(text.Expense_ID)}
                text={<i className="fas fa-edit"></i>} ></Button>
        </div>)
    }

    const ExpenseContent = ({ text, index }) => {
        return (<div className="card-body p-2 text-dark">
            <p className="card-text">Amount : {text.expense_amt}</p>
            <p className="card-text">Description : {text.expense_description}</p>
            <p className="card-text">Date : {text.Date}</p>
            <p className="card-text">Division : {text.expense_division}</p>
        </div>)
    }

    const ExpenseItem = ({ text, index }) => {
        return (
            <div className="card border-primary mt-2 mb-2">
                <ExpenseHeader text={text} index={index}></ExpenseHeader>
                <ExpenseContent text={text} index={index}></ExpenseContent>
            </div>
        )
    }

    const updateDetails = (index) => {
        console.log("im called");
        if (expense_category === "" || expense_description === "" || expense_amt === "" || Date==="") {
            alert("Empty Input Not Accepted!!")
        } else {
            updateExpense(index)
            // alert("expense updated successfully")
            seteditexpense(false)
        }
        setexpenseCategory("")
        setexpense_description("")
        setexpenseAmt("")
        setDate("")

    }



    if (editexpense !== false) {
        console.log("Here")
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Header></Header>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Title">Expense Category</label>
                                <input type="text" maxLength="15" className="form-control" value={expense_category} id="Title" onChange={handlesetexpenseCategory}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expense">Expense Description</label>
                                <input className="form-control" id="expense"  value={expense_description} onChange={handleexpense_description}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Title">Expense Amount</label>
                                <input type="number" maxLength="15" className="form-control"  value={expense_amt} id="Title" onChange={handlesetexpenseAmt}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expense">Date</label>
                                <input type="date" className="form-control" id="expense" value={Date}  onChange={handlesetDate}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expense">Expense Division</label>
                                <input type="text" className="form-control" id="expense" value={expense_division}  onChange={handleexpense_division}></input>
                            </div>
                        </form>
                        <button className="col-3 m-3 btn btn-primary text-light heading " onClick={() => updateDetails(editexpense)}>Update expense</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Header></Header>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Title">Expense Category</label>
                                <input type="text" maxLength="15" className="form-control" value={expense_category} id="Title" onChange={handlesetexpenseCategory}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expense">Expense Description</label>
                                <input className="form-control" id="expense" value={expense_description} onChange={handleexpense_description}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Title">Expense Amount</label>
                                <input type="number" maxLength="15" className="form-control" value={expense_amt} id="Title" onChange={handlesetexpenseAmt}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expense">Date</label>
                                <input type="date" className="form-control" id="expense" value={Date} onChange={handlesetDate}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expense">Expense Division</label>
                                <input type="text" className="form-control" id="expense" value={expense_division}  onChange={handleexpense_division}></input>
                            </div>
                        </form>
                        <button className="col-3 m-3 btn btn-primary heading text-light" onClick={addexpense}>Add New expense</button>
                    </div>

                    <div className="col-lg-6 mt-3 expenses">
                        <Filter />
                        {
                            expenseList.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <ExpenseItem text={data} index={index}></ExpenseItem>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );

    }

};

  export default Expense;