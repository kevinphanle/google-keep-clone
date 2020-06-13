import React, { useState } from 'react';
import axios from 'axios';

import removeIcon from '../images/remove.png';


const Card = props => {

  const [isHover, setHover] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    axios.delete(`/todos/removeTodo/${props.todo._id}`)
      .then(res => console.log(res.data))
      .then(() => props.deleteCallback(props.todo._id))
      .catch(e => {
        console.log(e);
      });
    // .then(() => axios.get('http://localhost:5000/todos/'));
  }


  const handleCurrentTodo = (todo) => {
    props.setCurrentTodo(todo);
  }

  const modalOpen = () => {
    handleCurrentTodo(props.todo);
    props.modalOpen(true);
  }

  const handleHover = () => {
    if (isHover) {
      setHover(false);
    } else {
      setHover(true);
    }
  }

  const color = props.todo.color

  return (
    <li
      className="card"
      style={{ backgroundColor: color, color: color === "#fff" ? "#444" : "#fff" }}
      onClick={modalOpen}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      // onMouseOut={setHover(false)}
    >
      {
        props.todo.title !== "" ? <div className="title">
          {props.todo.title}
        </div> : null
      }

      <div className="text">
        {props.todo.text}
      </div>

      {
        isHover ? <button className="delete" onClick={handleDelete} style={{ backgroundColor: color, color: color === "#fff" ? "rgb(130, 129, 129)" : "#fff" }}>
          <img src={removeIcon} alt="" />
        </button> : null
      }

    </li>

  )
}

const TodoIndex = (props) => {
  // console.log(props)

  const todoList = () => {
    return props.data.map((currentTodo, i) => {
      return <Card
        todo={currentTodo}
        deleteCallback={props.deleteCallback}
        key={i}
        modalOpen={props.setModalOpen}
        setCurrentTodo={props.setCurrentTodo}
      />
    })
  }

  // console.log(props);
  return (
    <div className="todo-index">
      {/* <h3>Todo Index</h3> */}
      <ul className="list">
        {
          todoList()
        }

      </ul>
    </div>
  )
}


export default TodoIndex;