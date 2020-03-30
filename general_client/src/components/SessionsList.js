import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import {
  downloadSession,
} from "../actions/sessionActions";
import { getCourses } from "../actions/courseActions";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SessionItemModal from "./SessionItemModal";
import SessionTab from "./SessionTab";
import "../CSS/NestedSessionsList.css";

const cookies = new Cookies();

class SessionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pid: cookies.get("pid") || "Furki",
      open: this.setOpenList(this.props.course.length)
    };

    // this.changeBtnValue = this.changeBtnValue.bind(this);
  }

  static propTypes = {
    getSessions: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.state.pid);
    this.props.getCourses(this.state.pid);
    //console.log(getCourses(this.state.pid));
  }

  onDownloadClick(course) {
    this.props.downloadSession(course);
  };

  onDeleteClick(session) {
    this.props.deleteSession(session);
  };

  openSession(course) {

    const newSession = {
      pid: this.state.pid, //Get from cookies once authentication is up and running
      sessionName: this.state.sessionName,
      courseCode: course
    };

    // Add item via addItem action
    this.props.viewSession(newSession);
  };

  toggleOpen = index => {
    const temp = this.state.open;
    temp[index] = !temp[index];
    this.setState({
      open: temp
    });
  };

  setOpenList = coursesLength => {
    var openList = new Array(coursesLength);
    for (var i = 0; i < openList.length; ++i) {
      openList[i] = false;
    }
    return openList;
  };

  render() {
    const { courses } = this.props.course;
    console.log(courses);
    console.log(this.props.session);

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="sessions-list">
            {courses.map((value, index) => (
              <CSSTransition timeout={500}>
                <List>
                  <ListItem
                    key={index}
                    button
                    onClick={this.toggleOpen.bind(this, index)}
                  >
                    <SessionItemModal course={value} />

                    <ListItemText primary={value} />


                    {this.state.open[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={this.state.open[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <SessionTab
                      pid={this.state.pid}
                      courseCode={value}
                      className="nested"
                    ></SessionTab>
                  </Collapse>
                </List>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  };
}


const mapStateToProps = state => ({
  session: state.session,
  course: state.course
});

export default connect(mapStateToProps, {
  //viewSession,
  getCourses,

  //getSessions,
  downloadSession
})(SessionsList);
