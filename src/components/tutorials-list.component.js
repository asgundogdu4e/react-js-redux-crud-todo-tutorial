import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../actions/tutorials";
import { Card, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";

class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.state = {
      searchTitle: "",
      show: false,
      tutorial: {},
    };
  }

  componentDidMount() {
    this.props.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {}

  findByTitle() {
    this.refreshData();

    this.props.findTutorialsByTitle(this.state.searchTitle);
  }

  setShow(show, tutorial) {
    this.setState({ show });
    if (tutorial) {
      this.setState({ tutorial });
    }
  }

  render() {
    const { searchTitle, show, tutorial } = this.state;
    const { tutorials } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Text></Card.Text>
          <Modal show={show} onHide={() => this.setShow(false)}>
            <Modal.Header>
              <Modal.Title>
                {!tutorial.id ? "New Tutorial" : "Edit Tutorial"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={tutorial.title}
                    placeholder="Enter Title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={tutorial.description}
                    placeholder="Enter Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    checked={tutorial.published}
                    label="Published"
                  />
                  {tutorial.published}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setShow(false)}>
                Cancel
              </Button>
              <Button variant="primary">Save</Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col xs={2}>
              <h4>Tutorials List</h4>
            </Col>
            <Col xs={10}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
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
                    onClick={this.findByTitle}
                    variant="outline-primary"
                    onClick={() => this.setShow(true, {})}
                  >
                    New Tutorial
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Published</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tutorials &&
                    tutorials.map((tutorial, index) => (
                      <tr key={index}>
                        <td>{++index}.</td>
                        <td>{tutorial.title}</td>
                        <td>{tutorial.description}</td>
                        <td>{tutorial.published ? "Published" : "Pending"}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            onClick={() => this.setShow(true, tutorial)}
                          >
                            Edit
                          </Button>{" "}
                          <Button variant="outline-danger">Delete</Button>{" "}
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
  return {
    tutorials: state.tutorials,
  };
};

export default connect(mapStateToProps, {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
})(TutorialsList);
