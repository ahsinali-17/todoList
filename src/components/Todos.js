import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  //states
  const [text, setText] = useState(""); //input bar text(value)
  const [todos, setTodos] = useState([]); //tasks
  const [showFinished, setshowFinished] = useState(false); //used to decide whether to show finished tasks or not
  const [btnText, setBtnText] = useState("Show Done"); //updating show finished button text 
  const [history,setHistory] = useState([])
  //loading stored tasks on first mount
  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length !== 0) {
      setTodos(savedTodos);
    }
    let deletedTodos = JSON.parse(localStorage.getItem("deleted"));
    if (deletedTodos && deletedTodos.length !== 0) {
      setHistory(deletedTodos);
    }
  }, []);
  

  //saving tasks in local storage
  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }; 
  const saveDeleted = (del) => {
    localStorage.setItem("deleted", JSON.stringify(del));
  }; 

  //adding tasks
  const handleAdd = () => {
    if (text === "") {
      alert("Specify a title first!!!");
    } else {
      const newTodo = { id: uuidv4(), text, iscompleted: false };
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];
        saveToLS(updatedTodos);
        return updatedTodos;
      });
      setText("")
    }
  };

  //updating input box
  const handleChange = (e) => {
    setText(e.target.value);
  };

  //editing tasks
  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setText(t[0].text);
    let temp = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(temp);
    saveToLS(temp);
  };

  //deleting tasks
  const handleDelete = (e, id) => {
    let temp = todos.filter((item) => {
      return item.id !== id;
    });
    let deleted = todos.filter((item) => {
      return item.id === id;
    })
    let will = window.confirm("Do you really want to delete this task?");
    if (will === true) {
      setTodos(temp);
      saveToLS(temp);
      setHistory([...history,...deleted])
      saveDeleted([...history,...deleted])
    } else {
      setTodos(todos);
    }
  };

  //checking completed tasks
  const chkChange = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    const temp = [...todos];
    temp[index].iscompleted = !temp[index].iscompleted;
    setTodos(temp);
    saveToLS(temp);
  };

  //showing completed tasks
  const filterTodo = (e) => {
    if (!showFinished) setBtnText("Hide Done");
    else setBtnText("Show Done");
    setshowFinished(!showFinished);
  };

  return (
    <>
      <div className="container mx-auto bg-violet-200 rounded-xl my-5 p-3 min-h-[85vh] w-1/2">
        {/*to get tasks from user as input */}
        <div className="addtodo">
          <h2 className="font-bold my-2 text-xl">Add new Task</h2>
          <input
            type="text"
            onChange={handleChange}
            value={text}
            className="w-3/4 mx-3 px-2 py-1 rounded-lg text-ellipsis text-violet-700"
          ></input>
          <button
            onClick={handleAdd}
            className="mx-3 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-sm text-red-600 cursor-pointer hover:text-lg transition-all"
          >
            Save
          </button>
        </div>

        {/*list of tasks */}
        <h2 className="my-4 mb-0 text-xl font-bold">Your Todos</h2>

        <button
          className="m-3 w-24 h-8 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-0 rounded-lg text-red-600 cursor-pointer hover:font-bold transition-all text-sm"
          onClick={filterTodo}
        >
          {btnText}
        </button>

        {
          todos.length === 0 && (
            <div className="m-2">You have no work to do.Enjoy!!!</div>
          ) //if list is empty
        }

        {
          //populating tasks using map
          todos.map((item,index) => {
            return (
              (showFinished || !item.iscompleted) && (
                <div
                  key={index}
                  className="todo flex justify-between items-center mx-3 my-1 border-2 border-black rounded-lg p-2"
                >
                  <div className={`${item.iscompleted ? "line-through" : ""}`}>
                    <input
                      type="checkbox"
                      name={item.id}
                      checked={item.iscompleted}
                      onChange={chkChange}
                    />{" "}
                    {item.text}
                  </div>
                  <div className="buttons flex gap-8">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="w-16 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-red-600 cursor-pointer hover:text-sm transition-all"
                    >
                      Edit
                    </button>

                    <button
                      id={item.id}
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="w-16 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-red-600 cursor-pointer hover:text-sm transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })
        }
      </div>
    </>
  );
}


