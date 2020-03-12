import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import SessionTab  from "./SessionTab";
import { connect } from "react-redux";
import {
  getSessions,
  downloadSession
} from "../actions/sessionActions";
import { getCourses } from "../actions/courseActions";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/AddBox";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DownloadIcon from "@material-ui/icons/SaveAlt";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import SessionItemModal from "./SessionItemModal";

const cookies = new Cookies();

class SessionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pid: cookies.get("pid") || "Furki"
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

  // changeBtnValue(course) {
  //   const newSession = {
  //     pid: PID, //Get from cookies once authentication is up and running
  //     courseCode: course
  //   };
    
  //   this.props.addSession(newSession);
  // }

  //   this.props.addCourse(newCourse);
  // }
  
  render() {
    const { sessions } = this.props.session;
    const { courses } = this.props.course;
    console.log(this.props.session);
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="sessions-list">
            {courses.map(course => (
              <CSSTransition timeout={500}>
                <ListItem >
                  <SessionItemModal course={course}/>
                   {/*<IconButton
                    aria-label="add"
                    key={course}
                    onClick={this.changeBtnValue.bind(this, course)}
                  >
                    <AddIcon />
                  </IconButton>*/}
                  <ListItemText primary={course}/>
                  <IconButton
                      color="dark"
                      style={{ marginBottom: "2rem" }}
                      onClick = {this.onDownloadClick.bind(this, course)}
                      >
                      <ArrowDownwardIcon />
                  </IconButton>
                </ListItem>

              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  
const mapStateToProps = state => ({
  session: state.session,
  course: state.course
});

export default connect(mapStateToProps, {
  getCourses,
  getSessions,
  downloadSession
})(SessionsList);
