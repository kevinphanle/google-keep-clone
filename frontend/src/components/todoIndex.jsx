import React from 'react';
import axios from 'axios';


const Card = props => {

  const handleDelete = () => {
    console.log(props.todo._id)

    axios.delete(`http://localhost:5000/todos/removeTodo/${props.todo._id}`)
      .then(res => console.log(res.data))
      .then(() => props.deleteCallback(props.todo.id))
      .catch(e => {
        console.log(e);
      });
    // .then(() => axios.get('http://localhost:5000/todos/'));
  }

  const color = props.todo.color

  return (
    <li className="card" style={{ backgroundColor: color, color: color === "#fff" ? "#444" : "#fff" }}>
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



  const todoList = () => {
    return props.data.map((currentTodo, i) => {
      return <Card todo={currentTodo} deleteCallback={props.deleteCallback} key={i} />
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