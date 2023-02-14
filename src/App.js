import React, { useState } from "react";



import Header from "./Header";

function App() {
  const [todoText, setTodoText] = useState("")
  const [todos, setTodos] = useState([])
  const [checkClick, setcheckClick] = useState(false)
  const [editClick, seteditClick] = useState(false)
  const [willUpdateText,setwillUpdateText]=useState("")
  const [willUpdateTodo, setwillUpdateTodo]=useState(null)


  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(i => i.id !== id)
    setTodos(filteredTodos)

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (todoText === "") {
      alert("Please write your todos")
      return
    }

    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false,

    };

    console.log(newTodo)
    setTodos([...todos, newTodo]);
    setTodoText("");


  }

  const todoUpdate=(event)=>{
    event.preventDefault()
    if(willUpdateText===""){
      alert("TodoText can't be empty")
      return
    }
    let tempTodos=[]
    todos.map(item=>{
      if(item.id===willUpdateTodo.id){
        let uptadedTodo={
          ...willUpdateTodo,
          title:willUpdateText
        } 
        tempTodos.push(uptadedTodo)
      }else{
        tempTodos.push(item)
      }
    })
    setTodos(tempTodos)
    seteditClick(false)
  }

  const changeHasDone = (todo) => {
    let tempTodos = [];
    todos.map((item) => {
      if (item.id === todo.id) {
        let uptadedTodo = {
          ...todo,
          hasDone: !todo.hasDone
        }
        tempTodos.push(uptadedTodo)
      } else {
        tempTodos.push(item)

      }

    })

    /*for(let i=0; i < todos.length;i++){
      if(todos[i].id===todo.id){
       let uptadedTodo={
        ...todo,
        hasDone: !todo.hasDone
       }
       tempTodos.push(uptadedTodo)
      }else{
        tempTodos.push(todos[i])

      }
    }*/
    setTodos(tempTodos)

  };

  return (

    <div>


      <Header />

      <div className="container mt-5">
        <form className="" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input value={todoText} onChange={(event) => setTodoText(event.target.value)}
              type="text" className="form-control  " placeholder="Write your todos..." />
            <button className="btn btn-primary w-25" type="submit" >ADD</button>
          </div>
        </form>
        {editClick === true && (
        <form onSubmit={todoUpdate} >
          <div className="input-group mb-3">
            <input value={willUpdateText} onChange={(event)=>setwillUpdateText(event.target.value)
              
            } className="form-control" type="text" />
            <button onClick={()=>{
              seteditClick(false)
            }} className="btn btn-danger w-25" type="submit" >Cancel</button>
            <button className="btn btn-primary w-25" type="submit" >Save</button>
          </div>

        </form>

      )}

        <div className="container">


          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Number of Todos</th>
                  <th scope="col">Todos</th>
                  <th scope="col">Todo Which Has Done </th>
                  <th scope="col">Process</th>

                </tr>
              </thead>
              <tbody>
                {todos.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan={3}>
                      <p>Yoo don't have any todos yet</p>
                    </td>
                  </tr>
                ) : (
                  <>
                    {todos.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.title}</td>
                        <td> <div className="form-check">
                          <input className="form-check-input" type="checkbox"
                            value={item}
                            onChange={() => { changeHasDone(item) }}  
                            
                            id="flexCheckChecked" />
                          <label className="form-check-label" >
                          {item.hasDone === false ? "Not Checked" : " Checked"}
                          </label>
                        </div> </td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example">
                            <button
                              onClick={() => deleteTodo(item.id)}
                              type="button"
                              className="btn btn-sm btn-danger">
                              Delete
                            </button>
                            <button onClick={() => {
                              seteditClick(true)
                              setwillUpdateText(item.title)
                              setwillUpdateTodo(item)
                            }} className="btn btn-small btn-secondary"> Edit </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}

              </tbody>
            </table>

          </>



        </div>





      </div>



    </div>

  );
}

export default App;


/*htmlfor="flexCheckChecked"*/