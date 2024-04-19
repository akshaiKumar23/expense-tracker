/* eslint-disable react/no-unescaped-entities */
import "./index.css";
import { useAddTransaction } from "../../../hooks/useAddTransaction";
import { useState } from "react";
import { useGetTransactions } from "./../../../hooks/useGetTransactions";
import { userGetUserInfo } from "../../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { name, profilePhoto } = userGetUserInfo();
  const transactionsContainerRef = useRef(null);

  useEffect(() => {
    if (transactionsContainerRef.current) {
      transactionsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transactions]);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description: description,
      transactionAmount: transactionAmount,
      transactionType: transactionType,
    });
    setDescription("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1 className="heading">{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3 className="balance-heading">Your Balance</h3>
            <h2
              style={{ color: transactionTotal.balance > 0 ? "green" : "red" }}
              className="balance-amount"
            >
              ${Math.abs(transactionTotal.balance)}
            </h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4 className="income-heading">Income</h4>
              <p className="income-amount">${transactionTotal.income}</p>
            </div>
            <div className="expenses">
              <h4 className="expenses-heading">Expenses</h4>
              <p style={{ color: "red" }}>${transactionTotal.expense}</p>
            </div>
          </div>
          <form action="" className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              className="transaction-input"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              className="transaction-input"
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <div className="transaction-type">
              <input
                type="radio"
                value="expense"
                id="expense"
                name="transactionType"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
              <input
                type="radio"
                value="income"
                id="income"
                name="transactionType"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>
            <button type="submit" className="add-button">
              Add Transaction
            </button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profilePhoto" src={profilePhoto} alt="" />
            <button className="sign-out-btn" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions" ref={transactionsContainerRef}>
        <h3>Transactions</h3>
        <ul>
          <div className="transactions-container">
            {transactions.map((transaction) => {
              const { description, transactionAmount, transactionType } =
                transaction;
              return (
                <li key={transaction.id}>
                  <h4>{description}</h4>
                  <p>
                    ${transactionAmount}.{" "}
                    <label
                      style={{
                        color: transactionType === "expense" ? "red" : "green",
                      }}
                    >
                      {transactionType}
                    </label>
                  </p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </>
  );
};

export default ExpenseTracker;
