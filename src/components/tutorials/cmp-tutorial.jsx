import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import {
  setShowAddEdit,
  updateTutorial,
  saveTutorial,
} from "./../../actions/actTutorials";

class cmpTutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: this.props.tutorial,
    };
  }
  render() {
    const saveTutorialEvent = () => {
      const { tutorial } = this.state;

      const data = {
        id: tutorial.id,
        title: tutorial.title,
        description: tutorial.description,
        published: tutorial.published,
      };

      if (tutorial.id) {
        this.props.updateTutorial(data);
      } else {
        this.props.saveTutorial(data);
      }
    };
    const onChangeHandler = (e) => {
      const { tutorial } = this.state;
      const name = e.target.name;
      let value = e.target.value;
      //console.log(e.target.type);
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
      this.setState({
        tutorial: {
          ...tutorial,
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
                  value={this.state.tutorial.title}
                  name="title"
                  onChange={onChangeHandler}
                  placeholder="Enter Title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.tutorial.description}
                  name="description"
                  onChange={onChangeHandler}
                  placeholder="Enter Description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="published"
                  onChange={onChangeHandler}
                  checked={this.state.tutorial.published}
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
            <Button variant="primary" onClick={() => saveTutorialEvent()}>
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
  updateTutorial,
  saveTutorial,
})(cmpTutorial);
