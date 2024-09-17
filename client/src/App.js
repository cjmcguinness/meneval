import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  async function getData() {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${userEmail}`);
      const json = await response.json();
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

// Empty dependency array to prevent running infinitely
  useEffect(() => {
    if(authToken) {
    getData()}
  }, []) 

  console.log(tasks);

  // Sort tasks by due_date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  return (
    <div className="app">
      <h1>Meneval</h1>
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <ListHeader listName={'Tasks'} getData={getData}/>
        <p className="user-email">Signed in with {userEmail}</p>
        {sortedTasks?.map((task) =>
          <ListItem key={task.id} task={task} getData={getData} />
        )}
      </>}
      </div>
  );
}

export default App;