import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]); 
  const { register, handleSubmit, error } = useForm();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch('http://localhost:8080').then((res) => {
      return res.json()
    }).then(res => {
      setData(res)
    })
  }

  const onSubmit = (data) => {
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"name": data.name, "age": data.age})
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
      <p>Name: {user.name} Age: {user.age} <button onClick={() => handleDelete(user)} >Delete</button></p>)
    )}
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Fish Name:</label>
      <input type="text" placeholder="name" name="name" ref={register}/>
      <input type="text" placeholder="age" name="age" ref={register}/>
      <input type="submit"/>
    </form>
  </div>

  );
}
export default App;
