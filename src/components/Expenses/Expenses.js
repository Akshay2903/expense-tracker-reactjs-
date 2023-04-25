import React, { useEffect, useState } from "react";
import classes from './Expenses.module.css';
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expenseReducer";

const Expenses = () => {
  const [refresh, setRefresh] = useState(false);
  const [expense, setExpense] = useState([]);
  const [category, setCategory] = useState("");
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [data, setData] = useState([]);
  const [premium, setPremium] = useState(false);
  const storedExpense =useSelector((state)=> state.expense.expense);
  const TotalExpense = useSelector((state)=> state.expense.totalexpense);
  const dispatch = useDispatch();

  const moneyHandler = (event) => {
    setMoney(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  //////Get request
  useEffect(() => {
    fetch(
      "https://expenses-d4ccf-default-rtdb.firebaseio.com/Expenses.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data);

        if(data !== null){
          const storeData = [];
        for (let key in data) {
          console.log(key);
          let d = {
            id: key,
            money: data[key].money,
            description: data[key].description,
            category: data[key].category,
          };
          storeData.unshift(d);
          console.log(d);
          dispatch(expenseActions.totalexpense(data[key].money));
        }
        dispatch(expenseActions.expense(storeData));
        setExpense([...storeData]);
        console.log(storeData);
        }
      });
  }, [refresh]);

  const expenseData = {
    money,
    description,
    category,
  };

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    ///For Editing
    if (editId) {
      fetch(
        `https://expenses-d4ccf-default-rtdb.firebaseio.com/Expenses/${editId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          setRefresh(true);
          setData(res.data);
        }
      });
    } else {
      //Post Data
      fetch(
        "https://expenses-d4ccf-default-rtdb.firebaseio.com/Expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            alert("data sent to the backend");
            setRefresh(true);
            return res.json();
          } else {
            return res.json((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  useEffect(() => {
    if(TotalExpense >= 10000){
      setPremium(true);
    }else{
      setPremium(false);
    }
  },[TotalExpense]);


  ///Delete
  const deleteListHandler = (id) => {
    const deleted = expense.filter((item) => {
      return item.id !== id;
    });
    setExpense(deleted);
    console.log(deleted);

    fetch(
      `https://expenses-d4ccf-default-rtdb.firebaseio.com/Expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Expense successfully deleted");
        return res.json();
      } else {
        return res.json((data) => {
          throw new Error(data.error.message);
        });
      }
    });
  };

  ////Edit
  const editHandler = (editId) => {
    console.log(editId);
    setEditId(editId);
    
    const editData = storedExpense.filter((item) => {
      return item.id === editId;
    });
    editData.map((item) => {
      setMoney(item.money);
      setCategory(item.category);
      setDescription(item.description);
      // return;
    });
    if(editId){
      fetch(`https://expenses-d4ccf-default-rtdb.firebaseio.com/Expenses/${editId}.json`,{
        method: "PUT",
        body:JSON.stringify(expenseData),
        headers:{
          "Content-Type": "application/json",
        },
      }).then((res)=> {
        if(res.ok){
          setRefresh(true);
        }
      });
    }else{
      //Post Data
      fetch(
        "https://expenses-d4ccf-default-rtdb.firebaseio.com/Expenses.json",
        {
          method: "POST",
          body:JSON.stringify(expenseData),
          headers:{
            "Content-Type": "application/json",
          },
        }
      ).then((res)=>{
        if(res.ok){
          alert("data sent to the backend");
            dispatch(expenseActions.expense(expenseData));
            setRefresh(true);
            return res.json();
        }else{
          return res.json((data) =>{
            throw new Error(data.error.message);
          });
        }
      }).catch((err) => {
        alert(err.message);
      })
    }
  };

  return (
    <div>
    <h3>Total Expense: ₹{TotalExpense}</h3>
    {premium && <button>Activate Premium</button>}
      <form onSubmit={expenseSubmitHandler}>
        <h2>Add Expenses</h2>
        <label htmlFor="expenseMoney">Money</label>
        <input
          id="expenseMoney"
          type="number"
          value={money}
          onChange={(event) => moneyHandler(event)}
        />
        <label htmlFor="expenseDescription">Description</label>
        <input
          id="expenseDescription"
          type="text"
          value={description}
          onChange={(event) => descriptionHandler(event)}
        />
        <label htmlFor="expenseCategory">Category</label>
        <select
          name="Category"
          id="expenseCategory"
          value={category}
          onChange={(event) => categoryHandler(event)}
        >
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="home decor">Home Decor</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {storedExpense.map((item) => {
        return (
          <ul key={item.id} className={classes.ul}>
            <li>Money: {item.money}</li>
            <li>Description: {item.description}</li>
            <li>Category: {item.category}</li>
            <div className={classes.btnn}>
              <button onClick={() => editHandler(item.id)}>Edit</button>
              <button onClick={() => deleteListHandler(item.id)}>Delete</button>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default Expenses;