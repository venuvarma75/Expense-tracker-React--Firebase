import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "../Configuration/Config";
import {
  collection,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
       console.log("LoggedInUser:",user);
      if (!user || !user.uid) {
        //  alert("User not logged in");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // Create user doc if it doesn't exist
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email || "",
          expenses: [],
        });
      }

      const newExpense = {
        ...expense,
        amount: parseFloat(expense.amount),
        createdAt: new Date().toISOString(),
      };
       console.log("Expense data to save:",expense);


      await updateDoc(userRef, {
        expenses: arrayUnion(newExpense),
      });

      alert("Expense added successfully!");

      // Reset form
      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });
      Navigate("/DashBoard")
    } catch (err) {
      console.error("Error adding expense:", err);
      // alert("Failed to add expense. Check console for details.");
    }
  };

  return (
    <div className="p-4">
      <h2>Add Expense</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="expenseTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={(e) =>
              setExpense({ ...expense, amount: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={expense.category}
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseNote">
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter note"
            value={expense.note}
            onChange={(e) => setExpense({ ...expense, note: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default AddExpense;
