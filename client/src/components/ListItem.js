import { useState } from 'react'
import Modal from './Modal'

function ListItem({task, getData}) {
  const [showModal, setShowModal] = useState(false)

  async function deleteItem() {
    try{
      const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'DELETE'
      }) 
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }
    return (
      <li className="list-item">
        <div className="info-container">
        <p className="task-title">{task.title}</p>
        <p className="task-description">{task.description}</p>
        <p className="task-due_date">{task.due_date}</p>
        </div>
        <div className="button-container">
          <button className="edit" onClick={()=>{setShowModal(true)}}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
      </li>
    )
  }

  export default ListItem
  