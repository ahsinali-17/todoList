import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
export default function History() {
  const [deletedTodos, setdeletedTodos] = useState([])
useEffect(() => {
    let deletedTodos = JSON.parse(localStorage.getItem("deleted"));
    if (deletedTodos !== null) 
      setdeletedTodos(deletedTodos);
    console.log(deletedTodos) 
}, [])

const clear =()=>{
  setdeletedTodos([])
  localStorage.setItem("deleted",JSON.stringify([]))
 }

  return (
    <div className='container mx-auto relative bg-violet-200 rounded-xl my-5 p-3 min-h-[85vh] w-1/2'>
      <h1 className='text-black font-bold my-2 text-xl'>History</h1>
      { (deletedTodos.length===0)?<div>History is Empty!</div>:deletedTodos.map((i,index)=>{
        return(
          <table className='w-full' key={index}>
            <tbody>
            <tr className='border-2 border-black rounded-lg w-full flex justify-around items-center my-1'>
              <td>{i.text}</td>
              <td>{(i.iscompleted)?<span className='text-green-500'>Finished</span>:<span className='text-red-500'>Unfinished</span>}</td>
            </tr>
            </tbody>
          </table>
        )
      })
      }
      <button className='w-32 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-red-600 cursor-pointer hover:text-sm transition-all absolute bottom-2 right-2' onClick={clear}>Clear History
      </button>
      <Link to="/todos"><button className='w-32 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-red-600 cursor-pointer hover:text-sm transition-all absolute bottom-2 right-30'>Back to Todos</button></Link>
    </div>
    
  )
}
