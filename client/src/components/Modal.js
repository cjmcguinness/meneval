import { useState } from 'react'
import { useCookies } from 'react-cookie'
//use .toISOString() on Date object

function Modal({ mode, setShowModal, getData, task}) {  
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    description: editMode ? task.description : null,
    due_date: editMode ? task.due_date : new Date().toISOString().split('T')[0]
  }) 
  
  async function postData(e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('Worked')
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function editData (e) {
    //prevents defaul action of refreshing the page
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  } 

    function handleChange(e) {
      console.log("changing", e)
      const {name, value} = e.target
      
      //if interacting with a target with name "title"
      //then overwrite the empty string with key "title"
      //in the object in useState function above
      //
      //similarly, if interacting with a target with name "description"
      //then overwrite the empty string with key "description"
      //in the object in useState function above

      setData(data => ({
        ...data,
        [name] : value
      }))
    }
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>{mode}</h3>
            <button onClick={()=>{setShowModal(false)}}>X</button>
          </div>

          <form>
            <input
              required
              maxLength={50}
              placeholder="Title"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <br/>
            <input
              required
              maxLength={255}
              placeholder="Description"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <br/>
            <input
              required
              type="date" 
              name="due_date"
              value={data.due_date}
              onChange={handleChange}
            />
            <input 
              className={mode} 
              type="submit" 
              onClick={editMode ? editData: postData}/>
          </form>
        </div>
      </div>
    )
  }
  
  export default Modal
  
