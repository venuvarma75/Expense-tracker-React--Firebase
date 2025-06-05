import React, { useEffect, useState } from "react";
import { db } from "../../Configuration/Config";
import { doc, getDoc } from "firebase/firestore";
import ExpenseForm from "../../Expenses/Expensesform/Expensesform";
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const userData = localStorage.getItem("loggedInUser");
      if (!userData) {
        console.error("User not logged in");
        return;
      }

      const user = JSON.parse(userData);
      if (!user.uid) {
        console.error("Invalid user object");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const expensesArray = data.expenses || [];
          setExpenses(expensesArray);

          const totalAmount = expensesArray.reduce(
            (sum, exp) => sum + parseFloat(exp.amount || 0),
            0
          );
          setTotal(totalAmount);
        } else {
          console.error("User document not found");
        }
      } catch (error) {
        console.error("Error fetching user expenses:", error);
      }
    };
    
    fetchExpenses();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Expense Dashboard</h2>
      <h5>Total Expense: ₹{total.toFixed(2)}</h5>
    {/* <ExpenseForm onExpenseAdded={fetchExpenses}/> */}
      <div className="mt-4">
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr key={index}>
                  <td>{exp.title || "-"}</td>
                  <td>₹{parseFloat(exp.amount || 0).toFixed(2)}</td>
                  <td>{exp.category || "-"}</td>
                  <td>{exp.date || "-"}</td>
                  <td>{exp.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
