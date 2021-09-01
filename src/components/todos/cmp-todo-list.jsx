import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setShowAddEdit,
  updateTodo,
  fetchTodos,
  saveTodo,
  findTodosByTask,
  deleteTodo,
} from "../../actions/actTodos";
import { Card, Table, Row, Col, Button, Modal } from "react-bootstrap";
import { DeleteAlert } from "../../assets/js/custom-sweetalert2";
import CmpTodo from "./cmp-todo";
import { HashLoader } from "react-spinners";

class cmpTodoList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.state = {
      searchTitle: "",
      show: false,
      todo: {},
    };
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  findByTitle() {
    this.props.findTodosByTask(this.state.searchTitle);
  }

  setShow(show, todo) {
    this.props.setShowAddEdit(show);
    if (todo) {
      this.setState({ todo });
    }
  }

  render() {
    const { searchTitle, show, todo } = this.state;
    const { todos } = this.props.data;

    const kaydiSilmeyeHazirla = (id) => {
      DeleteAlert().then((netice) => {
        if (netice) {
          this.props.deleteTodo(id);
        }
      });
    };

    const yeniKayitHazirla = (id) => {
      this.setShow(true, { task: "", description: "" });
    };
    return (
      <Card>
        <Card.Body>
          <Card.Text></Card.Text>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-task-vcenter"
            centered
            show={this.props.data.showAddEdit}
            onHide={() => this.setShow(false)}
          >
            <Modal.Header>
              <Modal.Title>
                {!todo.id ? "New Todo" : "Edit Todo"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CmpTodo todo={todo} show={show} />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Row>
            <Col xs={2}>
              <h4>Todos List</h4>
            </Col>
            <Col xs={10}>
              <div className="input-group mb-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by task"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.findByTitle}
                  >
                    Search
                  </button>
                </div>
                <div className="input-group-append">
                  <Button
                    className="btn btn-outline-secondary"
                    type="button"
                    variant="outline-primary"
                    onClick={yeniKayitHazirla}
                  >
                    New Todo
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}></Col>
            <Col xs={2}>
              <HashLoader
                color={"#36bdb3"}
                loading={this.props.data.fetching}
                className="loader"
              ></HashLoader>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th style={{ width: 140 + "px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todos &&
                    todos.map((todo, index) => (
                      <tr key={index}>
                        <td>{++index}.</td>
                        <td>{todo.task}</td>
                        <td>{todo.description}</td>
                        <td>{todo.completed ? "Completed" : "Pending"}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => this.setShow(true, todo)}
                          >
                            Edit
                          </Button>
                          {" | "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => kaydiSilmeyeHazirla(todo.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const netice = {
    data: state.rdcTodos,
  };
  return netice;
};

export default connect(mapStateToProps, {
  fetchTodos,
  updateTodo,
  findTodosByTask,
  deleteTodo,
  saveTodo,
  setShowAddEdit,
})(cmpTodoList);
