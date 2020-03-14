import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import SessionTab  from "./SessionTab";
import { connect } from "react-redux";
import {
  //getCourses,
  getSessions,
  downloadSession
} from "../actions/sessionActions";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/AddBox";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import SessionItemModal from "./SessionItemModal";
import toggle from "./SessionItemModal";

import { makeStyles } from "@material-ui/core/styles";
//import ListSubheader from "@material-ui/core/ListSubheader";
//import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
//import ListItemText from "@material-ui/core/ListItemText";
//import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
//import ExpandLess from "@material-ui/icons/ExpandLess";
//import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const cookies = new Cookies();

class SessionTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pid: cookies.get("pid") || "Furki"
    };

    // this.changeBtnValue = this.changeBtnValue.bind(this);
  }

  static propTypes = {
    getSessions: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
    //getCourses: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.state.pid);
    this.props.getSessions(this.state.pid);
    //console.log(getCourses(this.state.pid));
  }

  onDownloadClick(session) {
    this.props.downloadSession(session);
  }
  // onAddSessionClick() {
  //   this.props.toggle();
  // }

  // changeBtnValue() {
  //   const newCourse = {
  //     pid: PID, //Get from cookies once authentication is up and running
  //     courseCode: this.course
  //   };

  //   this.props.addCourse(newCourse);
  // }

  render() {
    const { sessions } = this.props.session;
    console.log(this.props.session);
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="sessions-list">
            {sessions.map(session => (
              <CSSTransition timeout={500}>
                <ListItem>
                  <ListItemText primary={session} />
                  <Button
                    color="dark"
                    style={{ marginBottom: "2rem" }}
                    onClick={this.onDownloadClick.bind(this, session)}
                  >
                    Download Session Data
                  </Button>
                </ListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, {
  //getCourses,
  getSessions,
  downloadSession
})(SessionTab);

/*
import React, { useState } from 'react';
import { ListGroup } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/AddBox';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { getSessions, getCourses, downloadSession } from '../actions/sessionActions';
import PropTypes from 'prop-types';

var courses = ["CSC343H5", "STA256H5", "CSC258H5"];
var sessions = ["Week 1 - LEC0102", "Week 2 - LEC0102"];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {

  const [course, setCourse] = useState('Default');
  const [session, setSession] = useState('Default');
  const [pid, setPid] = useState('Furki');
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Larry's Courses
      </ListSubheader>
      }
      className={classes.root}
    >
      {
        courses.map(course =>
          //For each "course" in courses_array, do the following:
          <ListGroup>
            {
              <ListItem button onClick={handleClick}>
                <IconButton className={classes.button} aria-label="add">
                  <AddIcon />
                </IconButton>
                <ListItemText primary={course} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            }
            {course === "CSC343H5" ?
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding> {
                  sessions.map(session =>
                    <ListItem button className={classes.nested}>
                      <IconButton
                        className={classes.button}
                        aria-label="download">
                        <DownloadIcon />
                      </IconButton>
                      <ListItemText primary={session} />
                    </ListItem>
                  )}
                </List>
              </Collapse>
              : null}
          </ListGroup>)}
    </List >
  );
}
*/

// import React, { Component } from "react";
// import { Container, ListGroup, ListGroupItem, Button} from "reactstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { connect } from "react-redux";
// import {
//   getCourses,
//   addCourse,
//   downloadSession
// } from "../actions/sessionActions";
// import PropTypes from "prop-types";
// import Cookies from "universal-cookie";

// import ListSubheader from "@material-ui/core/ListSubheader";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Collapse from "@material-ui/core/Collapse";
// import AddIcon from "@material-ui/icons/AddBox";
// import DownloadIcon from "@material-ui/icons/SaveAlt";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
// import IconButton from "@material-ui/core/IconButton";

// const cookies = new Cookies();
// const PID = cookies.get("pid") || "Furki";

// class SessionTab extends Component{
//     constructor(props){
//         super(props);
//     };

//     static propTypes = {
//         key: PropTypes.object.isRequired,
//         sesid: PropTypes.object.isRequired,
//         pid: PropTypes.object.isRequired
//     };

//     //gets the course that is
//     componentDidMount() {
//         console.log(this.props.sesid);
//         //this.props.getCourses(this.state.sesid);
//         // console.log(getCourses(this.state.sesid));
//         //console.log(getCourses(this.state.pid));
//     };

//     onDownloadClick(){
//         console.log(cookies);
//         console.log(this.props.sesid);
//         this.props.downloadSession(this.props.sesid);
//     }

//     render() {
//         return (
//         <Container>
//             <ListItem >
//             <IconButton
//                     aria-label="add"
//                     key={this.props.courseName}
//                     //onClick={this.changeBtnValue}
//                   >
//             <AddIcon />
//             </IconButton>
//             <ListItemText primary={this.props.courseName} />
//                 <Button
//                     color="dark"
//                     style={{ marginBottom: "2rem" }}
//                     onClick={this.onDownloadClick}
//                     >
//                     Download Session Data
//                 </Button>
//             </ListItem>
//         </Container>)
//     }

// }
// const mapStateToProps = state => ({
//     session: state.session
//   });

// export default connect(mapStateToProps, {
//     getCourses,
//     addCourse,
//     downloadSession
// })(SessionTab);
