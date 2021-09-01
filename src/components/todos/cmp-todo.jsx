import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import {
  setShowAddEdit,
  updateTodo,
  saveTodo,
} from "./../../actions/actTodos";

class cmpTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
    };
  }
  render() {
    const saveTodoEvent = () => {
      const { todo } = this.state;

      const data = {
        id: todo.id,
        task: todo.task,
        description: todo.description,
        completed: todo.completed,
      };

      if (todo.id) {
        this.props.updateTodo(data);
      } else {
        this.props.saveTodo(data);
      }
    };
    const onChangeHandler = (e) => {
      const { todo } = this.state;
      const name = e.target.name;
      let value = e.target.value;
      //console.log(e.target.type);
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
      this.setState({
        todo: {
          ...todo,
          [name]: value,
        },
      });
    };
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Text></Card.Text>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.todo.task}
                  name="task"
                  onChange={onChangeHandler}
                  placeholder="Enter Title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.todo.description}
                  name="description"
                  onChange={onChangeHandler}
                  placeholder="Enter Description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="completed"
                  onChange={onChangeHandler}
                  checked={this.state.todo.completed}
                  label="Published"
                />
              </Form.Group>
            </Form>
            <Button
              variant="secondary"
              onClick={() => this.props.setShowAddEdit(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={() => saveTodoEvent()}>
              Save
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  setShowAddEdit,
  updateTodo,
  saveTodo,
})(cmpTodo);
