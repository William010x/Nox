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

