import {useState} from 'react'
import { useCookies } from 'react-cookie'
//use .toISOString() on Date object

function Modal({ mode, setShowModal, getData, task}) {  
  const [cookies, setCookier, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  }) 
  
  async function postData(e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/todos', {
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
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
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
      //similarly, if interacting with a target with name "progress"
      //then overwrite the empty string with key "progress"
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
              placeholder="Your task goes here"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <br/>
            <label htmlFor="range"> Drag to select your current progress</label>
            <input
              required
              id="range"
              type="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
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
  