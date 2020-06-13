import React, { useState, useRef, useEffect } from 'react';
import { CirclePicker } from 'react-color';

// import Todo from './todo';
import axios from 'axios';

const Modal = (props) => {
  const { todo } = props

  const closeModal = () => {
    props.setModalOpen(false);
  }

  const [isColorOpen, setColorOpen] = useState(false);
  const [error, setError] = useState(false);
  let errortext = "";

  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoText, setTodoText] = useState(todo.text);
  const [todoColor, setTodoColor] = useState(todo.color);


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
      axios.patch(`http://localhost:5000/todos/update/${todo._id}`, todo)
        .then(res => console.log(res.data))
        .catch((err) => {
          console.log('error in updating todo')
          return Promise.reject(err)
        })
      setError(false);
    } else {
      // console.log("need text");
      errortext = "Need Text";
      console.log(errortext)
      setError(true);
    }

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

  let style = {};

  if (todo.color !== "#fff") {
    style.text = "#fff";
    style.bgColor = todo.color;
  } else {
    style.text = "#444";
    style.bgColor = todo.color
  }

  return (
    <div className="modal" >
      {/* <Todo/> */}
      <div className="modalBg" onClick={closeModal}></div>
      <div className="todo mod" >
        <form
          onSubmit={handleSubmit} className="inputForm"
          autoComplete="off"
          style={{
            color: style.text,
            backgroundColor: style.bgColor
          }}
        >


          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={handleTitleChange}
            className="new-todo-title"
            placeholder={todo.title ? todo.title : "Title"}
            style={{
              color: style.text,
              backgroundColor: style.bgColor
            }}
          />


          <input
            type="text"
            name="text"
            // placeholder={todo.text}
            value={todoText}
            onChange={handleTextChange}
            className="new-todo-text"
            style={{
              color: style.text,
              backgroundColor: style.bgColor
            }}

          ></input>

          {
            error && todoText === '' ? <div className="errors">Need Text!</div> : null
          }

          <div className="open">


            {isColorOpen ? <CirclePicker
              color={todoColor}
              onChangeComplete={handleColorChange}
              width="90%" margin="auto"
            ></CirclePicker> : null}

            <div className="bottom-bar">


              <a href="#"
                className="color-pallete"
                style={{color: style.text}}
                onClick={() => setColorOpen(!isColorOpen)}
              >Color</a>
              <button
                style={{color: style.text}}
                type="submit"
                className="done-button"
              >Done
            </button>

            </div>
          </div>


        </form>
      </div>
    </div>
  )
}


export default Modal;