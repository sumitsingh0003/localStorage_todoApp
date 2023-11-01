import { React, useState } from "react";

const TodoList = () => {
  const [state, setstate] = useState({
    name: "",
    message: "",
  });

  const [todoData, setTodoData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [itemID, setItemId] = useState();

  const handleInput = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const submtForm = () => {
    const {name,message} = state;
    if(!name || !message){
        alert('Please Fill The Data')
    }else{
        setTodoData([...todoData, state]);
        setstate({ name: "", message: "" });
    }
  };

  const deletData = (id) => {
    setTodoData((current) => {
      return current.filter((item, indx) => {
        return indx !== id;
      });
    });
  };

  const editData = (val, index) => {
    setstate({
      name: val.name,
      message: val.message,
    });
    setItemId(index);

  };

  const updateData = (id) => {
    const { name, message } = state;
    setTodoData(
      todoData.map((preVal, preId) => {
        if (preId === id) {
          return { ...preVal, name: name, message: message };
        }
        return preVal;
      })
    );
    setstate({
      name: "",
      message: "",
    });
    setItemId()
  };


  const comepleteData = (val, id) =>{
    setCompData([...compData, val])
    setTodoData((current) => {
        return current.filter((item, indx) => {
          return indx !== id;
        });
      });
  }

  const inComepleteData = (val, id) =>{
    setTodoData([...todoData, val])
    setCompData((current) => {
        return current.filter((item, indx) => {
          return indx !== id;
        });
      });
  }


  return (
    <>
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
            placeholder="message"
            name="message"
            value={state.message}
            onChange={handleInput}
          />

          {itemID===undefined ? <button onClick={submtForm}>Submit</button>:<button onClick={() => updateData(itemID)}>Update</button>}

          
        </div>
      </section>

      <section className="List_item">
        <div className="completeData">
        <h2>Incomeplete Data</h2>
          {todoData.map((item, ind) => {
            return (
              <div className="box" key={ind}>
              <button onClick={() => comepleteData(item, ind)}>✓</button>
              <div className="itemList">
                <p>{item.name}</p>
                <p>{item.message}</p>
              </div>
              <div className="itemList">
                <button onClick={() => editData(item, ind)}>Edit</button>
                <button onClick={() => deletData(ind)}>Delete</button>
              </div>
              </div>
            );
          })}
        </div>

        <div className="completeData">
        <h2>Comeplete Data</h2>
          {compData.map((item, ind) => {
            return (
              <div className="box" key={ind}>
              <button onClick={() => inComepleteData(item, ind)}>X</button>
              <div className="itemList">
                <p>{item.name}</p>
                <p>{item.message}</p>
              </div>
              <div className="itemList">
                {/* <button onClick={() => editData(item, ind)}>Edit</button>
                <button onClick={() => deletData(ind)}>Delete</button> */}
              </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TodoList;
