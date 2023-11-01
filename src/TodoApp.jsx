import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [state, setState] = useState({
    name: "",
    message: "",
  });
  const [todoData, setTodoData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [itemID, setItemId] = useState();

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem('todos'));
    if (getData) {
      setTodoData(getData);
    }

    const getComplData = JSON.parse(localStorage.getItem('complData'));
    if (getComplData) {
      setCompData(getComplData);
    }
  }, []);


  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    const { name, message } = state;
    if (!name && !message) {
      alert('Please Fill The Data');
    } else {
      setTodoData([...todoData, state]);
      localStorage.setItem('todos', JSON.stringify([...todoData, state]));
      setState({ name: "", message: "" });
    }
  };

  const deleteData = (id) => {
    setTodoData((current) => current.filter((item, indx) => indx !== id));
    localStorage.setItem('todos', JSON.stringify(todoData.filter((item, indx) => indx !== id)));
  };

  const editData = (val, index) => {
    setState({
      name: val.name,
      message: val.message,
    });
    setItemId(index);
  };

  const updateData = (id) => {
    const { name, message } = state;
    const updatedData = todoData.map((preVal, preId) => {
      if (preId === id) {
        return { ...preVal, name: name, message: message };
      }
      return preVal;
    });
    setTodoData(updatedData);
    localStorage.setItem('todos', JSON.stringify(updatedData));
    setState({ name: "", message: "" });
    setItemId();
  };

  const completeData = (val, id) => {
    setCompData([...compData, val]);
    localStorage.setItem('complData', JSON.stringify([...compData, val]))

    setTodoData((current) => current.filter((item, indx) => indx !== id));
    localStorage.setItem('todos', JSON.stringify(todoData.filter((item, indx) => indx !== id)));
  };




  const incompleteData = (val, id) => {
    setTodoData([...todoData, val]);
    localStorage.setItem('todos', JSON.stringify([...todoData, val]))

    setCompData((current) => current.filter((item, indx) => indx !== id));
    localStorage.setItem('complData', JSON.stringify(compData.filter((item, indx) => indx !== id)))
  };


  return (
    <>
      <h1>Todo App</h1>
      <section className="main_bx">
        <div className="form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={state.name}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Message"
            name="message"
            value={state.message}
            onChange={handleInput}
          />
          {itemID === undefined ? (
            <button onClick={submitForm}>Submit</button>
          ) : (
            <button onClick={() => updateData(itemID)}>Update</button>
          )}
        </div>
      </section>

      <section className="List_item">
        <div className="completeData">
          <h2>Incomplete Data</h2>
          {todoData.map((item, ind) => (
            <div className="box" key={ind}>
              <button onClick={() => completeData(item, ind)}>✓</button>
              <div className="itemList">
                <p>{item.name}</p>
                <p>{item.message}</p>
              </div>
              <div className="itemList">
                <button onClick={() => editData(item, ind)}>Edit</button>
                <button onClick={() => deleteData(ind)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="completeData">
          <h2>Complete Data</h2>
          {compData.map((item, ind) => (
            <div className="box" key={ind}>
              <button onClick={() => incompleteData(item, ind)}>X</button>
              <div className="itemList">
                <p>{item.name}</p>
                <p>{item.message}</p>
              </div>
              <div className="itemList"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TodoApp;
