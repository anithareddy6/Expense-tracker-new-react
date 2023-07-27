import React, { Fragment, useRef, useState, useEffect } from "react";
import styles from "./AddExpense.module.css";
import ExpenseAdded from "./ExpenseAdded";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { themeActions } from "../../store/themeSlice";


const AddExpense = (props) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();

  // const[item, getDetail] = useState([]);
  const ExpenseCount = useSelector((state) => state.expense.totalExpense);
  const item = useSelector((state) => state.expense.items);
  const isPremium = useSelector((state) => state.theme.isActivated);

  let username = localStorage.getItem("email") || " ";
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;

  const getId = (id, isEdit) => {
    const toEdit = item.find((expense) => expense.key === id);
    console.log(id);
    if (isEdit) {
      amountRef.current.value = toEdit.amount;
      descriptionRef.current.value = toEdit.description;
      categoryRef.current.value = toEdit.category;
    }

    // let newArr = []

    //  newArr  = item.filter((ite) => {
    //     return ite !== toEdit
    // })
    // getDetail(newArr)

    fetch(
      `https://react-expense-f81fd-default-rtdb.firebaseio.com/expenseList/${username}/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    dispatch(cartActions.removeExpense(id));
  };

  useEffect(() => {
    fetch(
      `https://react-expense-f81fd-default-rtdb.firebaseio.com/expenseList/${username}.json`
    )
      .then((res) => {
        if (!res.ok) {
          console.log("Something went wrong!");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        let localItem = [];
        let localtotalExpense = 0;
        for (let [key, value] of Object.entries(data)) {
          localItem.push({ key, ...value });
          localtotalExpense = localtotalExpense + +value.amount;
        }
        // getDetail(localItem)
        dispatch(
          cartActions.replaceExpense({
            items: localItem || [],
            totalExpense: localtotalExpense,
          })
        );
      });
  }, []);

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const selectedCategory = categoryRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    const details = {
      amount: enteredAmount,
      category: selectedCategory,
      description: enteredDescription,
    };
    // getDetail([...item, details])
    const res = await fetch(
      `https://react-expense-f81fd-default-rtdb.firebaseio.com/expenseList/${username}.json`,
      {
        method: "POST",
        body: JSON.stringify(details),
      }
    );
    if (res.ok) {
      amountRef.current.value = "";
      categoryRef.current.value = "";
      descriptionRef.current.value = "";
    } else {
      console.log(res);
    }
    window.location.reload();
    dispatch(
      cartActions.addExpense({
        amount: enteredAmount,
        description: enteredDescription,
        category: selectedCategory,
      })
    );
  };

  const buyPremiumHandler = (e) => {
    e.preventDefault();
    dispatch(themeActions.activateTheme());
  };

  return (
    <Fragment>
      <form className={styles.formContainer} onSubmit={addExpenseHandler}>
        <h1>Fill Expense Details 👇</h1>
        <div className={styles.addExpense}>
          <div>
            <label htmlFor="amount">Amount</label>
            <br />
            <input
              type="number"
              id="amount"
              placeholder="Enter Your Amount"
              ref={amountRef}
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <br />
            <select id="category" ref={categoryRef} required>
              <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Medical">Medical</option>
            </select>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            type="text"
            id="description"
            placeholder="Enter Description"
            rows={3}
            ref={descriptionRef}
            required
          />
        </div>
        <br />
        <button type="submit">Add Expense</button>
        {ExpenseCount > 1000 && !isPremium && (
          <button onClick={buyPremiumHandler}>Buy Premium</button>
        )}
      </form>
      <ExpenseAdded getId={getId} />
    </Fragment>
  );
};
export default AddExpense;
