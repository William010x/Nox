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
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
import "../CSS/NestedSessionsList.css";

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

class SessionTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pid: props.pid,
      courseCode: props.courseCode
    };
  }

  static propTypes = {
    getSessions: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
  };

  componentDidMount() {
    console.log(this.state.pid);
    this.props.getSessions(this.state.pid, this.state.courseCode);
    console.log(getSessions(this.state.pid, this.state.courseCode));
  }

  onDownloadClick(session) {
    this.props.downloadSession(session);
  }

  render() {
    const { sessions } = this.props.session;
    console.log(this.props.session);
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="sessions-list">
            {sessions.map((value, index) => (
              <CSSTransition timeout={500}>
                <ListItem key={index} button>
                  <ListItemText primary={value.sesid} className="nested" />
                  <Button 
                    className="remove-btn"
                    color="danger">
                      &times;
                  </Button>
                  <IconButton
                    color="dark"
                    onClick={this.onDownloadClick.bind(
                      this,
                      this.state.courseCode
                    )}
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
