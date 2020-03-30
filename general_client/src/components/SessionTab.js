import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import SessionTab  from "./SessionTab";
import { connect } from "react-redux";
import {
  deleteSession,
  getSessions,
  downloadSession
} from "../actions/sessionActions";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { makeStyles } from "@material-ui/core/styles";
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
      courseCode: props.courseCode,
      showComponent: true
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

  onDeleteClick(session) {
    this.props.deleteSession(session);
  };

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
                    color="danger"
                    onClick={
                      this.onDeleteClick.bind(this, value.sesid)
                    }>
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
  downloadSession,
  deleteSession
})(SessionTab);
