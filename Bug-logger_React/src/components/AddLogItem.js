import { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { GlobalContext } from "../context/GlobalState";

const AddLogItem = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [priority, setPriority] = useState("");

  const { addLog, setAlert } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 9000) + 1000;
    const created = new Date().toString();
    if (text === "" || user === "" || priority === "") {
      setAlert({ show: true, message: "Please fill the fields", variant: "danger" });
      setTimeout(() => {
        setAlert({ show: false, message: "", variant: "success" });
      }, 3000);
      return;
    }
    addLog({ id, text, priority, user, created });
    setAlert({ show: true, message: "Log Added", variant: "success" });
    setTimeout(() => {
      setAlert({ show: false, message: "", variant: "success" });
    }, 3000);
    setText("");
    setUser("");
    setPriority("");
  };

  return (
    <Card className='mt-3 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            <Col>
              <Form.Control
                placeholder='Log'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                placeholder='User'
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                as='select'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value='0'>Select Priority</option>
                <option value='low'>Low</option>
                <option value='modearte'>Moderate</option>
                <option value='high'>High</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <Button type='submit' variant='secondary' block>
                Add Log
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddLogItem;
