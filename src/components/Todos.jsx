import React, { useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";
import axios from "axios";
const api = "https://city-country-database.herokuapp.com/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [oldItem, setOldItem] = useState({});
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const getData = () => {
    axios
      .get(api)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);
  const handleInput = (e) => {
    if (e.charCode == 13) {
      handleClick();
    }
  };

  const handleClick = () => {
    let payload = {
      title: task,
      status: false,
    };
    const postData = () => {
      axios
        .post(api, payload)
        .then((res) => {
          setTodos([...todos, res.data]);
          setTask("");
        })
        .then(() => getData())
        .catch((e) => console.log(e));
    };
    postData();
  };

  //   Deleting some value

  const handleDelete = (id) => {
    deletePost(id);
  };

  const deletePost = (id) => {
    axios
      .delete(api + `/${id}`)
      .then((res) => getData())
      .catch((e) => console.log(e));
  };

  //   Edit functionality
  const handleEdit = (item) => {
    setOldItem(item);
  };

  const handleUpdate = (item, e) => {
    if (e.charCode == 13) {
      updateFunc(item);
    }
  };

  const updateFunc = (id) => {
    let payload = {
      title: value,
      status: false,
    };
    console.log(payload);
    fetch(api + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    }).then(() => getData());
  };

  // Changing Status
  const handleStatus = (item) => {
    setIsChecked(!isChecked);
    statusChangeFun(item);
  };

  const statusChangeFun = (item) => {
    if (!isChecked) {
      let payload = {
        title: item.title,
        status: true,
      };
      console.log(payload);
      fetch(api + `/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-type": "application/json" },
      }).then(() => getData());
    } else {
      let payload = {
        title: item.title,
        status: false,
      };
      console.log(payload);
      fetch(api + `/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-type": "application/json" },
      }).then(() => getData());
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Todo App</h1>
      <div className="input-div">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add something here..."
          onKeyPress={(e) => handleInput(e)}
        />
      </div>
      <div className="todoItems">
        {todos.map((item) => {
          return (
            <SingleTodo
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              item={item}
              key={item.id}
              setValue={setValue}
              handleUpdate={handleUpdate}
              handleStatus={handleStatus}
            />
          );
        })}
      </div>

      <div className="paginate">
        <button>⬅️ Prev</button>
        <button>Next ➡️</button>
      </div>
    </div>
  );
};

export default Todos;
