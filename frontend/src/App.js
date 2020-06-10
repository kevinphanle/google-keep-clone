import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios';

import './App.css';
import Navbar from './components/navbar';
import Todo from './components/todo';
import TodoIndex from './components/todoIndex';


function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todos/')
      .then(res => {
        console.log("in get todos")
        setTodos(res.data.reverse())
      }).catch(function (err) {
        console.log(err);
      })
  }, []);

  const newTodo = (todo) => {
    return setTodos(todos => [todo, ...todos])
  }

  const deleteTodo = (id) => {
    return setTodos(todos.filter(todo => todo._id !== id))
  }
  // console.log(todos);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Todo callback={newTodo.bind(this)}/>
        <TodoIndex data={todos} deleteCallback={deleteTodo.bind(this)}/>
      </div>

    </Router>
  );
}

export default App;
