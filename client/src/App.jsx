import { useState } from 'react'
import './App.css'
import {BiSolidEditAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md"

function App() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const addTask  = async (e) => {
    e.preventDefault()
    console.log(title,desc)
  }

  return (
    <main className="main">
      <h1>A Simple Test-TaskApp to test my backend API</h1>
      <p>Hey, there!, dont  mind my frontend, this is not the focus!</p>
      <form>
        <h2>Add a task!</h2>
        <div className="form-field">
            <input type="text" placeholder='Title...' value={title} onChange={(e) =>setTitle(e.target.value)} />
            <textarea type="text" placeholder='content...' rows="5" value={desc} onChange={(e) =>setDesc(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
        </div>
      </form>
      <div className="content">
        <div className="content-cont">
          <div className="cont">
          <input type="checkbox" className="checkbox" />
          <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="func">
          <BiSolidEditAlt className="edit" />
          <MdDelete className="delete" />
        </div>
        </div>
        <div className="content-cont">
          <div className="cont">
          <input type="checkbox" className="checkbox" />
          <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="func">
          <BiSolidEditAlt  className="edit" />
          <MdDelete className="delete" />
        </div>
        </div>
        <div className="content-cont">
          <div className="cont">
          <input type="checkbox" className="checkbox" />
          <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="func">
          <BiSolidEditAlt className="edit"  />
          <MdDelete className="delete" />
        </div>
        </div>
      </div>
    </main>
  )
}

export default App
