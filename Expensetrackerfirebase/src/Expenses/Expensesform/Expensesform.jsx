
// components/Dashboard/ExpenseForm.js
import React, { useState } from "react";
import { db } from "../../Configuration/Config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });



  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userData || !userData.uid) return;

    const expenseData = {
      ...expense,
      amount: parseFloat(expense.amount),
      createdAt: new Date().toISOString(),
    };

    const userRef = doc(db, "users", userData.uid);
    await updateDoc(userRef, {
      expenses: arrayUnion(expenseData),
    });

    onExpenseAdded(); // refresh dashboard
    setExpense({ title: "", amount: "", category: "", date: "", note: "" });
  };


  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col"><input type="text" name="title" placeholder="Title" value={expense.title} onChange={handleChange} className="form-control" required /></div>
        <div className="col"><input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} className="form-control" required /></div>
        <div className="col"><input type="text" name="category" placeholder="Category" value={expense.category} onChange={handleChange} className="form-control" required /></div>
        <div className="col"><input type="date" name="date" value={expense.date} onChange={handleChange} className="form-control" required /></div>
        <div className="col"><input type="text" name="note" placeholder="Note" value={expense.note} onChange={handleChange} className="form-control" /></div>
        <div className="col"><button type="submit" className="btn btn-primary">Add Expense</button></div>
      </div>
    </form>
  );
};

export default ExpenseForm;
