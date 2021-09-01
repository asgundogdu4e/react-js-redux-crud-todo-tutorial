import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setShowAddEdit,
  updateTutorial,
  fetchTutorials,
  saveTutorial,
  findTutorialsByTitle,
  deleteTutorial,
} from "../../actions/actTutorials";
import { Card, Table, Row, Col, Button, Modal } from "react-bootstrap";
import { DeleteAlert } from "../../assets/js/custom-sweetalert2";
import CmpTutorial from "./cmp-tutorial";
import { HashLoader } from "react-spinners";

class cmpTutorialList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.state = {
      searchTitle: "",
      show: false,
      tutorial: {},
    };
  }

  componentDidMount() {
    this.props.fetchTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  findByTitle() {
    this.props.findTutorialsByTitle(this.state.searchTitle);
  }

  setShow(show, tutorial) {
    this.props.setShowAddEdit(show);
    if (tutorial) {
      this.setState({ tutorial });
    }
  }

  render() {
    const { searchTitle, show, tutorial } = this.state;
    const { tutorials } = this.props.data;

    const kaydiSilmeyeHazirla = (id) => {
      DeleteAlert().then((netice) => {
        if (netice) {
          this.props.deleteTutorial(id);
        }
      });
    };

    const yeniKayitHazirla = (id) => {
      this.setShow(true, { title: "", description: "" });
    };
    return (
      <Card>
        <Card.Body>
          <Card.Text></Card.Text>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.data.showAddEdit}
            onHide={() => this.setShow(false)}
          >
            <Modal.Header>
              <Modal.Title>
                {!tutorial.id ? "New Tutorial" : "Edit Tutorial"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CmpTutorial tutorial={tutorial} show={show} />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Row>
            <Col xs={2}>
              <h4>Tutorials List</h4>
            </Col>
            <Col xs={10}>
              <div className="input-group mb-3">
                <input
                  type="search"
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
                    variant="outline-primary"
                    onClick={yeniKayitHazirla}
                  >
                    New Tutorial
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Published</th>
                    <th style={{ width: 140 + "px" }}>Actions</th>
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
                            size="sm"
                            variant="outline-primary"
                            onClick={() => this.setShow(true, tutorial)}
                          >
                            Edit
                          </Button>
                          {" | "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => kaydiSilmeyeHazirla(tutorial.id)}
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
    data: state.rdcTutorials,
  };
  return netice;
};

export default connect(mapStateToProps, {
  fetchTutorials,
  updateTutorial,
  findTutorialsByTitle,
  deleteTutorial,
  saveTutorial,
  setShowAddEdit,
})(cmpTutorialList);
