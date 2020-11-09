import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

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
      body: JSON.stringify({ "name": data.name, "age": data.age, "img": data.img })
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
      <section className="form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" name="name" ref={register} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" placeholder="Age" name="age" ref={register} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Img</Form.Label>
            <Form.Control type="text" placeholder="Password" name="img" ref={register} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </section>

      {data.map(user => (
        <p>Name: {user.name} Age: {user.age} img: <img src={user.img} /> <button onClick={() => handleDelete(user)} >Delete</button></p>)
      )}

      <section className="flex-contaoner">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

      </section>

    </div>

  );
}
export default App;
