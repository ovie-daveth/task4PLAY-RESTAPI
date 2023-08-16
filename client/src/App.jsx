import { useEffect, useState } from 'react'
import './App.css'
import {BiSolidEditAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md"

function App() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonType, setButtonType] = useState("add")
  const [updatedData, setUpdatedData] = useState('')

  const addTask = async (e) => {
    e.preventDefault();
    console.log(title, desc);
    try {
        const response = await fetch("http://localhost:5001/api/v1/task", {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                title: title,
                desc: desc
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data1 = await response.json();
        setData((prevData) => [...prevData, data1]);

        console.log("success", data);
    } catch (error) {
        console.log(error.message);
    }
}

useEffect(() => {
  const getAllTasks = async () => {
      try {
        setLoading(true)
          const tasksResponse = await fetch("http://localhost:5001/api/v1/task/",{
            headers: {"Content-Type": "application/json"},
            method: "GET",
          });
          if (!tasksResponse.ok) {
              console.log("Something came up, try again");
              return;
          }
          const { tasks } = await tasksResponse.json(); // Access the 'tasks' array
          setData(tasks);
      } catch (error) {
          console.error("Error fetching tasks:", error);
      } finally{
        setLoading(false);
      }
  }

  getAllTasks();
}, []);

const deleteTask = async(id) => {
  try {
    const response = await fetch(`http://localhost:5001/api/v1/task/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'Delete',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data1 = await response.json();
    console.log("deleted", data1);
} catch (error) {
    console.log(error.message);
}
}
const EditTask = async(id) => {
  setButtonType("edit");
  try {
    const response = await fetch(`http://localhost:5001/api/v1/task/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data1 = await response.json();
    setUpdatedData(data1);
   
} catch (error) {
    console.log(error.message);
}
}
console.log("success", updatedData);

  return (
    <main className="main">
      <h1>A Simple Test-TaskApp to test my backend API</h1>
      <p>Hey, there!, dont  mind my frontend, this is not the focus!</p>
      <form>
        <h2>Add a task!</h2>
        <div className="form-field">
            <input type="text" placeholder='Title...' value={updatedData.title ? updatedData.title : title} onChange={(e) =>setTitle(e.target.value)} />
            <textarea type="text" placeholder='content...' rows="5" value={updatedData.desc ? updatedData.desc : desc} onChange={(e) =>setDesc(e.target.value)} />
            <button onClick={()=>addTask(buttonType)}>{buttonType==="add"?"Add Task":"Update Task"}</button>
        </div>
      </form>
      <div className="content">
      {
        loading ? <div className="">Loading...</div>:(
          data.length > 0 ? (data.map((task)=>(
            <div key={task._id} className="content-cont">
            <div className="cont">
            <input type="checkbox" className="checkbox" />
            <p>{task.title}</p>
            </div>
            <div className="func">
            <BiSolidEditAlt className="edit" onClick={()=>EditTask(task._id)} />
            <MdDelete className="delete" onClick={()=>deleteTask(task._id)} />
          </div>
          </div>
          ))):(
            <div className="">No task  available</div>
          )
        )
      }
      </div>
    </main>
  )
}

export default App
