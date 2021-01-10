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
            INCOME
        </div>

    )
}
  const Mainpage = () => {
    const [incomeList, setincomeList] = React.useState([]); //counts will be initialized as a list - [0]
    const [income_category, setincomeCategory] = React.useState("");
    const [income_description, setincome_description] = React.useState("");
    const [income_amt, setincomeAmt] = React.useState("");
    const [Date,setDate] = React.useState("")

    const [filterOption, setfilterOption] = React.useState("all")
    const [editincome, seteditincome] = React.useState(false)

    const getAllIncome = ()=>{
      fetch('https://money-manager-app-rohini.herokuapp.com/income/allDetails/1')
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        if(data.data.length === 0){
          alert("No income are added")
        }else{
          setincomeList(data.data)
        }
      });
  }
  const addIncome = ()=>{
    fetch('https://money-manager-app-rohini.herokuapp.com/income/add',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "income_category":income_category,
          "income_amt":income_amt,
          "income_description": income_description,
          "userId" : 1,
          "Date" : Date
        }),
      })
    .then(response => response.json())
    .then(data =>{
      console.log(data.msg)
      if(data.msg === "Income added successfully"){
        alert(data.msg)
      }else{
        alert("Oops! "+data.msg+" Try Again!")
      }
    });
}

const updateIncome = ()=>{
  fetch('https://money-manager-app-rohini.herokuapp.com/income/edit',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "income_category":income_category,
        "income_amt":income_amt,
        "income_description": income_description,
        "userId" : 1,
        "Date" : Date,
        "Income_ID" :editincome
      }),
    })
  .then(response => response.json())
  .then(data =>{
    console.log(data.msg)
    if(data.msg === "Income updated successfully"){
      alert(data.msg)
      getAllIncome()
    }else{
      alert("Oops! "+data.msg)
    }
  });
}

const deleteIncome = (index)=>{
  fetch('https://money-manager-app-rohini.herokuapp.com/income/delete',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userId" : 1,
        "Income_ID" :index
      }),
    })
  .then(response => response.json())
  .then(data =>{
    console.log(data.msg)
    if(data.msg === "Record Deleted"){
      alert(data.msg)
      getAllIncome()
    }else{
      alert("Oops! "+data.msg)
    }
  });
}

    const addincome = () => {
        if (income_category === "" || income_description === "" || income_amt === "" || Date==="" ) {
            alert("Empty Input Not Accepted!!")
        } else {
            addIncome()
        }
        setincomeCategory("")
        setincome_description("")
        setincomeAmt("")
        setDate("")
    }
    const handlesetincomeCategory = (event) => {
        console.log(event.target.value)
        setincomeCategory(event.target.value);
    };

    const handleincome_description = (event) => {
      setincome_description(event.target.value);
    };

    const handlesetincomeAmt = (event) => {
      console.log(event.target.value)
      setincomeAmt(event.target.value);
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
                onClick={() => getAllIncome()}
                text="Display All Incomes" ></Button>
        </div>)
    }

    const updateincome = (index) => {
        seteditincome(index)
    }

    const IncomeHeader = ({ text, index }) => {
        return (<div className="card-header text-dark font-weight-bold p-1">Income Category : {text.income_category} &nbsp; &nbsp;
            <Button className="btn btn-outline-danger float-right"
                onClick={() => deleteIncome(text.Income_ID)}
                text={<i className="far fa-trash-alt"></i>} ></Button>
            <Button className="btn btn-outline-secondary float-right mr-1"
                onClick={() => updateincome(text.Income_ID)}
                text={<i className="fas fa-edit"></i>} ></Button>
        </div>)
    }

    const IncomeContent = ({ text, index }) => {
        return (<div className="card-body p-2 text-dark">
            <p className="card-text">Amount : {text.income_amt}</p>
            <p className="card-text">Description : {text.income_description}</p>
            <p className="card-text">Date : {text.Date}</p>
        </div>)
    }

    const IncomeItem = ({ text, index }) => {
        return (
            <div className="card border-primary mt-2 mb-2">
                <IncomeHeader text={text} index={index}></IncomeHeader>
                <IncomeContent text={text} index={index}></IncomeContent>
            </div>
        )
    }

    const updateDetails = (index) => {
        console.log("im called");
        if (income_category === "" || income_description === "" || income_amt === "" || Date==="") {
            alert("Empty Input Not Accepted!!")
        } else {
            updateIncome(index)
            // alert("income updated successfully")
            seteditincome(false)
        }
        setincomeCategory("")
        setincome_description("")
        setincomeAmt("")
        setDate("")

    }



    if (editincome !== false) {
        console.log("Here")
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Header></Header>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Title">Income Category</label>
                                <input type="text" maxLength="15" className="form-control" value={income_category} id="Title" onChange={handlesetincomeCategory}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="income">Income Description</label>
                                <input className="form-control" id="income"  value={income_description} onChange={handleincome_description}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Title">Income Amount</label>
                                <input type="number" maxLength="15" className="form-control"  value={income_amt} id="Title" onChange={handlesetincomeAmt}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="income">Date</label>
                                <input type="date" className="form-control" id="income" value={Date}  onChange={handlesetDate}></input>
                            </div>
                        </form>
                        <button className="col-3 m-3 btn btn-primary text-light heading " onClick={() => updateDetails(editincome)}>Update income</button>
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
                                <label htmlFor="Title">Income Category</label>
                                <input type="text" maxLength="15" className="form-control" value={income_category} id="Title" onChange={handlesetincomeCategory}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="income">Income Description</label>
                                <input className="form-control" id="income" value={income_description} onChange={handleincome_description}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Title">Income Amount</label>
                                <input type="number" maxLength="15" className="form-control" value={income_amt} id="Title" onChange={handlesetincomeAmt}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="income">Date</label>
                                <input type="date" className="form-control" id="income" value={Date} onChange={handlesetDate}></input>
                            </div>
                        </form>
                        <button className="col-3 m-3 btn btn-primary heading text-light" onClick={addincome}>Add New income</button>
                    </div>

                    <div className="col-lg-6 mt-3 incomes">
                        <Filter />
                        {
                            incomeList.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <IncomeItem text={data} index={index}></IncomeItem>
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

  export default Mainpage;