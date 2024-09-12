import React, { useState, useEffect } from "react";

// To Get Data from Local Storage
const getLocalStorage = () => {
  let List = localStorage.getItem("todoItems");
  return List ? JSON.parse(List) : [];
};

export default function Index() {
  const [inputData, setInput] = useState("");
  const [item, setItem] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(null); 
  const [editData, setEditData] = useState("");

  const handletask = (event) => {
    setInput(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditData(event.target.value); 
  };

  const addItem = () => {
    if (inputData.trim() !== "") {
      setItem((t) => [...t, inputData]);
      setInput("");
    }
  };

  const deleteItem = (index) => {
    const updateItems = item.filter((_, i) => i !== index);
    setItem(updateItems);
  };

  const moveItemUp = (index) => {
    if (index > 0) {
      const updateItems = [...item];
      [updateItems[index], updateItems[index - 1]] = [updateItems[index - 1], updateItems[index]];
      setItem(updateItems);
    }
  };

  const moveItemDown = (index) => {
    if (index < item.length - 1) {
      const updateItems = [...item];
      [updateItems[index], updateItems[index + 1]] = [updateItems[index + 1], updateItems[index]];
      setItem(updateItems);
    }
  };

  const editItem = (index) => {
    setIsEditing(index); 
    setEditData(item[index]); 
  };

  const saveEdit = (index) => {
    const updatedItems = [...item];
    updatedItems[index] = editData; 
    setItem(updatedItems);
    setIsEditing(null);
  };

  const removeAll = () => {
    setItem([]);
  };

  // Store items in Local Storage
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(item));
  }, [item]);

  return (
    <div className="container">
      <h1 className="heading">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          onChange={handletask}
          value={inputData}
        />
        <button onClick={addItem} className="btn btn-danger">
          Add Task
        </button>
      </div>
      <div className="tasks-container">
        <ol>
          {item.map((task, index) => (
            <li key={index} className="task-item">
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editData}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(index)} className="btn btn-success btn-sm">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="task-text">{task}</span>
                  <div className="button-container">
                    <button onClick={() => deleteItem(index)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                    <button onClick={() => moveItemUp(index)} className="btn btn-dark btn-sm">
                      &#x25B2; 
                    </button>
                    <button onClick={() => moveItemDown(index)} className="btn btn-dark btn-sm">
                      &#x25BC; 
                    </button>
                    <button onClick={() => editItem(index)} className="btn btn-primary btn-sm">
                      Edit
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
      <button onClick={removeAll} className="btn btn-warning remove-all">
        Remove All
      </button>
    </div>
  );
}
