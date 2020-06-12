import React from 'react';
import axios from 'axios';


const Card = props => {

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/todos/removeTodo/${props.todo._id}`)
      .then(res => console.log(res.data))
      .then(() => props.deleteCallback(props.todo._id))
      .catch(e => {
        console.log(e);
      });
    // .then(() => axios.get('http://localhost:5000/todos/'));
  }

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/todos/update/${props.todo._id}`)
      .then(res => console.log(res.data))
      .catch(e => {
        console.log(e);
    })
  }

  const modalOpen = () => {
    props.modalOpen(true);
  }

  const color = props.todo.color

  return (
    <li
      className="card"
      style={{ backgroundColor: color, color: color === "#fff" ? "#444" : "#fff" }}
      onClick={modalOpen}
    >
      {
        props.todo.title !== "" ? <div className="title">
          {props.todo.title}
        </div> : null
      }

      <div className="text">
        {props.todo.text}
      </div>
      <button className="delete" onClick={handleDelete} style={{ backgroundColor: color, color: color === "#fff" ? "rgb(130, 129, 129)" : "#fff" }}>
        X
    </button>
    </li>

  )
}

const TodoIndex = (props) => {
  console.log(props)

  const todoList = () => {
    return props.data.map((currentTodo, i) => {
      return <Card
        todo={currentTodo}
        deleteCallback={props.deleteCallback}
        key={i}
        modalOpen={props.setModalOpen}
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