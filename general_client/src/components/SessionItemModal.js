import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addSession } from "../actions/sessionActions";
import axios from "axios";
import Cookies from "universal-cookie";
import AddIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
const cookies = new Cookies();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
axios.defaults.withCredentials = true;
const PID = cookies.get("pid") || "Furki";

class SessionItemModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      pid: PID,
      course: this.props.course,
      sessionName: "default"
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ sessionName: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newSession = {
      pid: PID, //Get from cookies once authentication is up and running
      sessionName: this.state.sessionName,
      courseCode: this.state.course
    };

    // Add item via addItem action
    this.props.addSession(newSession);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {/* <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          New Session
        </Button> */}
        <IconButton aria-label="add" onClick={this.toggle}>
          <AddIcon />
        </IconButton>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a Session</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="sessionName">Session Name</Label>
                <Input
                  type="text"
                  sessionName="sessionName"
                  id="sessionName"
                  placeholder="Enter Session Name"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Session
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sessionName: state.sessionName
});

export default connect(mapStateToProps, { addSession })(SessionItemModal);
