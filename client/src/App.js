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

  const getData = async () => {


    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

// Empty dependency array to prevent running infinitely
  useEffect(() => {
    if(authToken) {
    getData()}
  }, []); 

  console.log(tasks);

  // Sort tasks by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <ListHeader listName={'Work tick list'} getData={getData}/>
        <p className="user-email">You are signed in under {userEmail}</p>
        {sortedTasks?.map((task) =>
          <ListItem key={task.id} task={task} getData={getData} />
        )}
      </>}
      </div>
  );
}

export default App;