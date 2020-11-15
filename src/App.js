import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const App = () => {
  const [data, setData] = useState([]);
  const { register, handleSubmit, error, reset } = useForm();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch('https://us-central1-apifishdata.cloudfunctions.net/app').then((res) => {
      return res.json()
    }).then(res => {
      setData(res)
    })
  }

  const onSubmit = (data) => {
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": data.name, "record": data.record, "info": data.info, "img": data.img })
    }
    fetch('https://us-central1-apifishdata.cloudfunctions.net/app/create', fetchOptions)
      .then(res => res.json())
      .then(res => {
        handleFetch();
        reset()
      })
  }

  const handleDelete = (user) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    fetch('https://us-central1-apifishdata.cloudfunctions.net/app/delete', fetchOptions)
      .then(() => {
        handleFetch();
      })
  }

  return (
    <div className="App">
      <h1>TYPES OF FISH IN THE UK:</h1>
      <section className="form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group >
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Carp" name="name" ref={register} />
          </Form.Group>
          <Form.Group >
            <Form.Label>British Record:</Form.Label>
            <Form.Control type="text" placeholder="67lb 8oz" name="record" ref={register} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Info:</Form.Label>
            <Form.Control type="text" name="info" ref={register} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Image URL:</Form.Label>
            <Form.Control type="text" placeholder="https://image.com" name="img" ref={register} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </section>

      <section className="flex-contaoner">
        <Card className="item-cards" style={{ width: '300px' }}>
          <Card.Img variant="top" src='https://canalrivertrust.org.uk/refresh/media/original/21055.jpg?v=92e60b' />
          <Card.Body>
            <Card.Title>Pike</Card.Title>
            <Card.Text>
              British record: 46lb 13oz (British record committee 2015)
            </Card.Text>
            <Card.Text>
              While fierce looking, the pike is a very fragile fish and the upmost of care must be taken when handling them.
            </Card.Text>
            <Button variant="primary" variant="secondary" disabled>Delete</Button>
          </Card.Body>
        </Card>
        <Card className="item-cards" style={{ width: '300px' }}>
          <Card.Img variant="top" src="https://badangling.com/wp-content/uploads/2018/02/Common-Carp-Underwater.jpg" />
          <Card.Body>
            <Card.Title>Carp</Card.Title>
            <Card.Text>
              British record: 67lb 8oz (British record committee 2015)
            </Card.Text>
            <Card.Text>
              Canal fishing for carp is a challenge, but potentially highly rewarding.
            </Card.Text>
            <Button variant="primary" variant="secondary" disabled>Delete</Button>
          </Card.Body>
        </Card>
        <Card className="item-cards" style={{ width: '300px' }}>
          <Card.Img variant="top" src="https://canalrivertrust.org.uk/refresh/media/original/41353.jpg?v=573c0d" />
          <Card.Body>
            <Card.Title>Roach</Card.Title>
            <Card.Text>
              British record: 4lb 4oz (British record committee 2015)
            </Card.Text>
            <Card.Text>
              While you will catch some roach by fishing close to the towpath bank, you will have more success from the boat channel or far bank area.
            </Card.Text>
            <Button variant="primary" variant="secondary" disabled>Delete</Button>
          </Card.Body>
        </Card>
        {data.map(user => (
          <Card className="item-cards" style={{ width: '300px' }}>
            <Card.Img variant="top" src={user.img} />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>British record: {user.record}</Card.Text>
              <Card.Text>{user.info}</Card.Text>
              <Button variant="primary" onClick={() => handleDelete(user)}>Delete</Button>
            </Card.Body>
          </Card>
        )
        )}
      </section>

    </div>

  );
}
export default App;
