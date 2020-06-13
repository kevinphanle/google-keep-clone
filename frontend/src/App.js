import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios';

import './App.css';
import Navbar from './components/navbar';
import Todo from './components/todo';
import TodoIndex from './components/todoIndex';
import Modal from './components/modal';


function App() {

  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    axios.get('/todos/')
      .then(res => {
        setTodos(res.data.reverse())
      }).catch(function (err) {
        console.log(err);
      })
  }, []);

  const newTodo = (todo) => {
    return setTodos(todos => [todo, ...todos])
  }

  const deleteTodo = (id) => {
    console.log("from app.js: ", id)
    return setTodos(todos.filter(todo => todo._id !== id))
  }
  // console.log(todos);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Todo callback={newTodo.bind(this)}/>
        <TodoIndex data={todos} deleteCallback={deleteTodo} setModalOpen={setModalOpen} setCurrentTodo={setCurrentTodo} />

        {modalOpen ? <Modal setModalOpen={setModalOpen} todo={currentTodo} /> : null }
      </div>

    </Router>
  );
}

export default App;
