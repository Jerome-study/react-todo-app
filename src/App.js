
import { useState } from 'react';
import './App.css';

function App() {

  const [newTodo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  
  const addTodo = () => {
    const newItem = {
      title: newTodo,
      created: new Date().toLocaleDateString(),
      id: todoList.length,
      isUpdating: false,
      isDone: false
    };
    setTodoList([...todoList, newItem]);
  };

  return (
    <div>
      
      < Header setTodo = {setTodo} newTodo = {newTodo} addTodo= {addTodo}/>
      < RenderList todoList = {todoList} setTodoList={setTodoList}/>
      
    </div>
  );
}

function Header(props) {
  return (
    <>
      <h1>Todo List App</h1>
      <input type="text" value={props.newTodo} onChange={(e)=> {props.setTodo(e.target.value)}}/>
      <button onClick={props.addTodo}>Add Todo</button>
    </>
  )
}

function RenderList(props) {

  const [updatedTitle, setUpdatedTitle] = useState("")

  const deleteTodo = (e) => {

    const filteredArray = props.todoList.filter(todo => {
      if (todo.id === parseInt(e.target.id)) {
        return false
      } else {
        return true
      }
    })
    props.setTodoList(filteredArray)
  };

  const editTodo = (e) => {
    
    const id = parseInt(e.target.id)
  
    const mapArr = props.todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, isUpdating: true}
      }
      else {
        return {...todo, isUpdating: false}
      }
    })
    
    props.setTodoList(mapArr)
  };

  const setUpdated = (e) => {
    setUpdatedTitle(e.target.value)
    
  };

  const updateTodo = (e) => {
    const id = parseInt(e.target.id)

    const mapArr = props.todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, title:updatedTitle, isUpdating: false}
      }
      else {
        return todo
      }
    })
    props.setTodoList(mapArr)
  };

  const scratchTodo = (e) => {
    const id = parseInt(e.target.id)

    const mapArr = props.todoList.map(todo => {
      if (todo.id === id) {
       return {...todo, isDone: todo.isDone? false: true}
      }
      else {
        return todo
      }
    })
    console.log(mapArr)
    props.setTodoList(mapArr)
  };

  return (
    <div>
      {props.todoList.map((todo,index) => {
        return (
          <div key={index}>
            {todo.isUpdating? <input type='text' id={todo.id} placeholder={todo.title}  onChange={setUpdated} /> : <h1 style={{color: todo.isDone? "green": "black"}}>{todo.title}</h1> }
            {todo.isUpdating? <button id={todo.id} onClick={updateTodo}>Save</button>: null}
            <button id={todo.id} onClick={deleteTodo}>Delete</button>
            <button id={todo.id} onClick={editTodo}>Update</button>
            <button id={todo.id} onClick={scratchTodo}>Scratch</button>
            <h1>{todo.created}</h1>
          </div>
        )
      })}
    </div>
  )
}
export default App;
