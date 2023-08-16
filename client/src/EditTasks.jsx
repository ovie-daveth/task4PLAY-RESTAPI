import React, {useEffect, useState} from 'react'

const EditTasks = ({setButtonType, updateData}) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [data, setData] = useState(false)
  const [id, setId] = useState('')

  useEffect(() => {
    if (updateData?.task) {
      setTitle(updateData.task.title || '');
      setDesc(updateData.task.desc || '');
      setId(updateData.task._id || '');
    }
  }, [updateData]);

  console.log(id)

  const updateTask = async (e) => {
    e.preventDefault()
    try {
      setData(true)
      const response = await fetch(`http://localhost:5001/api/v1/task/${id}`, {
        headers: { 'Content-Type': 'application/json'},
        method: "PATCH",
        body: JSON.stringify({
          title,
          desc
        })
      })
      if(!response.ok){
        alert("internale error: " + response.error)
        throw new Error("error updating")
      }
      const responseData = await response.json(); // Corrected: Added "await" here
      console.log('updated', responseData);
      window.location.reload()
      setButtonType('add')
    } catch (error) {
      console.log(error)
      alert('error', error.message)
      setData(false)
    } finally {
      setData(false)
    }
  }

 

  console.log("edit", updateData.task)
  return (
    <div>
      <form>
        <h2>Edit task!</h2>
        <div className="form-field">
            <input type="text" placeholder='Title...' value={title} onChange={(e) =>setTitle(e.target.value)} />
            <textarea type="text" placeholder='content...' rows="5" value={desc} onChange={(e) =>setDesc(e.target.value)} />
            <button onClick={updateTask}>{data ? "Loading...":"Add Task"}</button>
        </div>
      </form>
    </div>
  )
}

export default EditTasks
