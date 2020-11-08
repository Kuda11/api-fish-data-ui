import { useEffect, useState } from 'react';
import "./App.css";
const App = () => {
  // Store our data/collections here for us to show
  const [data, setData] = useState([]); 
  // Store the name of the person we are going to create
  // NOTE: this is the value in the form input
  const [input, setInput] = useState("");
  useEffect(() => {
    // 1. On component load/mount let's make a call to our API and show some data on the page....
    handleFetch();
  }, []);
  const handleFetch = () => {
    fetch('http://localhost:8080').then((res) => {
      return res.json()
    }).then(res => {
      setData(res)
    })
  }
  const handleSubmit = (e) => {
    // Stop our page submitting
    e.preventDefault();
    // *********************************
    // 3. TODO!! Let's make POST request to our API...
    // *********************************
    const fetchOptions = {
      // This is a POST Request
      method: 'POST',
      // We are gonna send JSON
      headers: { 'Content-Type': 'application/json' },
      // Data goes in the body
      body: JSON.stringify({"name": input})
    }
    fetch('http://localhost:8080/create', fetchOptions)
      .then(res => res.json())
      .then(res => {

        console.log("YAY WE GOT OUR RESPONSE BACK....")
        console.log(res);

        handleFetch();
      })
  }
  const handleDelete = (user) => {
    const fetchOptions = {

      method: 'DELETE',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(user)
    }
    fetch('http://localhost:8080/delete', fetchOptions)
      .then(() => {
      console.log('succssfully deleted' + user.name)
      handleFetch();
    })
    }

  return (
    <div className="App">
      <h1>Types of Fish</h1>
      
      {data.map(user =>(
        <p>{user.name} <button onClick={() => handleDelete(user)} >Delete</button></p>)
      )}
      <form>
        <label>Fish Name:</label>
        <input type="text" onChange={(e) => setInput(e.target.value)}/>
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
export default App;
