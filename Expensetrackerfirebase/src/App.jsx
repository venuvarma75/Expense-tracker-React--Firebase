import React from "react"
import Register  from "./Pages/Register/Register.";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import AddExpense from "./Pages/AddExpense";
 import Dashboard from "./Pages/DashBoard/DashBoard";
import { Routes, Route } from "react-router-dom";
import ExpenseForm from "./Expenses/Expensesform/Expensesform";

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpenseForm />} />
      </Routes>
    </div>
  );
};

export default App;
