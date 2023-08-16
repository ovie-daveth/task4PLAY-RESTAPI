import { useEffect, useState } from 'react'
import './App.css'
import {BiSolidEditAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import EditTasks from './EditTasks'

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
            alert(response)
            throw new Error('Network response was not ok');
        }

        const data1 = await response.json();
        setData((prevData) => [...prevData, data1]);
        console.log("success", data);
        window.location.reload()
    } catch (error) {
        console.log(error.message);
        alert(error.message)
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
          const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setData(sortedTasks);
      } catch (error) {
          console.error("Error fetching tasks:", error);
      } finally{
        setLoading(false);
      }
  }

  getAllTasks();
}, []);

const handleOnchange = async (id) => {
  try {
    const taskToUpdate = data.find(task => task._id === id);
    const updatedCompleted = !taskToUpdate.completed; // Toggle the completed value

    const response = await fetch(`http://localhost:5001/api/v1/task/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({
        completed: updatedCompleted,
      }),
    });

    if (!response.ok) {
      alert('Network response was not ok');
      throw new Error('Network response was not ok');
    }

    const data1 = await response.json();
    console.log('updated', data1);
    window.location.reload();
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};


const deleteTask = async(id) => {
  try {
    const response = await fetch(`http://localhost:5001/api/v1/task/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'Delete',
    });

    if (!response.ok) {
        alert("Network response was not ok"); 
        throw new Error('Network response was not ok');
        
    }

    const data1 = await response.json();
    console.log("deleted", data1);
    window.location.reload()
} catch (error) {
    console.log(error.message);
    alert(error.message);
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
      <div className={` ${buttonType === "edit" ? "show" : "hide"}`}>
        <EditTasks setButtonType={setButtonType} updateData={updatedData} />
      </div>
      <h1>A Simple Test-TaskApp to test my backend API</h1>
      <p>Hey, there!, dont  mind my frontend, this is not the focus!</p>
      <form>
        <h2>Add a task!</h2>
        <p>You have {data.length} task already</p>
        <div className="form-field">
            <input type="text" placeholder='Title...' value={title} onChange={(e) =>setTitle(e.target.value)} />
            <textarea type="text" placeholder='content...' rows="5" value={desc} onChange={(e) =>setDesc(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
        </div>
      </form>
      <div className="content">
      {
        loading ? <div className="">Loading...</div>:(
          data.length > 0 ? (data.map((task)=>(
            <div key={task._id} className="content-cont">
            <div className="cont">
            <input type="checkbox" checked={task.completed ? true : false} onChange={()=>handleOnchange(task._id)} className="checkbox" />
            <p className={`${task.completed===true && 'complete'}`}>{task.title}</p>
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
