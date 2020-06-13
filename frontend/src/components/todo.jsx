import React, { useState, useRef, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import axios from "axios";




const Todo = (props) => {

  const [areaOpen, setAreaOpen] = useState(false);
  const [isColorOpen, setColorOpen] = useState(false);
  const [error, setError] = useState(false);
  let errortext = "";

  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [todoColor, setTodoColor] = useState("#fff");

  const outsideref = useRef(null);
  useOutsideClick(outsideref, setAreaOpen);


  const handleSubmit = (e) => {
    e.preventDefault();
    let todo = {
      title: todoTitle,
      text: todoText,
      color: todoColor,
      isDone: false,
      hasAttachment: false
    }

    if (todo.text !== "") {
      axios.post('http://localhost:5000/todos/addTodo', todo)
        .then(res => console.log(res.data))
        .catch((err) => {
          console.log('error in adding todo')
          return Promise.reject(err)
        })
      props.callback(todo);
      setError(false);
    } else {
      // console.log("need text");
      errortext = "Need Text";
      console.log(errortext)
      setError(true);
    }

    resetForm();

  }

  const resetForm = () => {
    setTodoTitle("");
    setTodoText("");
  }

  const handleTitleChange = (e) => {
    setTodoTitle(e.target.value);
  }

  const handleTextChange = (e) => {
    setTodoText(e.target.value);
  }

  const handleColorChange = (color) => {
    setTodoColor(color.hex);
  }

  const handleOpenTodo = (e) => {
    e.stopPropagation();
    setAreaOpen(true);
  }

  return (
    <div className="todo" >
      <form
        onSubmit={handleSubmit} className="inputForm"
        autoComplete="off"
        ref={outsideref}
        action="/addTodo"
        method="POST"
      >

        {
          areaOpen ?
            <input
              type="text"
              name="title"
              value={todoTitle}
              onChange={handleTitleChange}
              className="new-todo-title"
              placeholder="Title"
            /> : null
        }

        <input
          type="text"
          name="text"
          placeholder="Add Note..."
          value={todoText}
          onChange={handleTextChange}
          className="new-todo-text"
          onFocus={handleOpenTodo}

        ></input>

        {
          error && todoText === '' && areaOpen ? <div className="errors">Need Text!</div> : null
        }

        {
          areaOpen ? <div className="open">


            {isColorOpen ? <CirclePicker
              color={todoColor}
              onChangeComplete={handleColorChange}
              width="90%" margin="auto"
            ></CirclePicker> : null}

            <div className="bottom-bar">


              <a href="#"
                className="color-pallete"
                onClick={() => setColorOpen(!isColorOpen)}
              >Color</a>
              <button
                type="submit"
                className="done-button"
              >Done
            </button>

            </div>
          </div> : null
        }

      </form>
    </div>
  )
}


function useOutsideClick(ref, func) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        func(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

export default Todo;