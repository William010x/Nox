import React, { Component } from "react";
import Histogram from "../components/Histogram";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import "../CSS/Chat.css";
import "../CSS/Histogram.css";
import { Button} from "react-bootstrap";
import { PublicURL } from "../config/constants";
import LineChart from "../components/LineChart";

// Get current session id from cookie
const cookies = new Cookies();
const sessionID = cookies.get("Prof_sesid");

// Establish socket connection for the Professor
// This will allow the Professor to recieve Data from the server
let socket;

console.log("THIS IS PROFESSOR CLIENT SOCKET INFO: ", socket);

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.messages = React.createRef();
    //  this.scrollToBottom = this.scrollToBottom.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      // Initially, we have 0 students in each category.

      totalStudentsConnected: 0,
      okayStudents: 0,
      goodStudents: 0,
      confusedStudents: 0,
      average_rating: null,
      allMessages: [],
      avgColorRGB: "grey",
      display: true
    };

    var that = this;

    // As the data comes in from the socket, the chart is re-updated.
    if (!socket) {
      socket = io(PublicURL + ":5001");
      socket.on("connect", function onConnect() {
        socket.emit("proffesorSocket", {
          sesid: sessionID,
          socketID: socket.id
        });
        console.log(socket.id);
        socket.on("incomingComment", commentJson => {
          console.log(commentJson);
          that.setState({
            allMessages: that.state.allMessages.concat(commentJson)
          });
        });
        socket.on("Data", JsonParameters => {
          // Sets the front end state end to w.e the new values
          console.log("PROF IS: ", JsonParameters);
          // Sets the front end state end to w.e the new values
          that.setState({
            chartData: {
              labels: ["Good", "Okay", "Confused"],
              datasets: [
                {
                  label: "Number Of Students",
                  data: [
                    JsonParameters.goodStudents,
                    JsonParameters.okayStudents,
                    JsonParameters.confusedStudents
                  ],
                  backgroundColor: [
                    "rgba(0,255,0,0.3)", // good
                    "rgba(255,255,0,0.3)", // okay
                    "rgba(255,0,0,0.3)" // confused
                  ],
                  borderWidth: 4,
                  borderColor: "Grey",
                  hoverBorderWidth: 8,
                  hoverBorderColor: "Black"
                }
              ]
            },
            lineChartData: {
              title: "Student's Understanding Progression",
              labels: ["10", "20", "30", "40", "50", "60"],
              datasets: [
                {
                  label: "Confused",
                  fill: false,
                  data: JsonParameters.oldConfusedStudents,
                  tension: 0,
                  borderColor: "rgb(255, 99, 132)",
                  borderWidth: 3,
                  hoverBorderWidth: 10,
                  hoverBorderColor: "#000"
                },
                {
                  label: "Good",
                  fill: false,
                  data: JsonParameters.oldGoodStudents,
                  tension: 0,
                  borderColor: "rgb(150, 0, 0)",
                  borderWidth: 3,
                  hoverBorderWidth: 10,
                  hoverBorderColor: "#000"
                },
                {
                  label: "Okay",
                  fill: false,
                  data: JsonParameters.oldOkayStudents,
                  tension: 0,
                  borderColor: "rgb(0, 0, 255)",
                  //backgroundColor:['rgba(0, 255, 0, 0.7)']
                  borderWidth: 3,
                  hoverBorderWidth: 10,
                  hoverBorderColor: "#000"
                }
              ]
            },
            average_rating: JsonParameters.average_rating,
            avgColorRGB: JsonParameters.avgRGB,
            totalStudentsConnected: JsonParameters.totalStudents
          });
        });
      });
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  toggle() {
    this.setState({
        display: !this.state.display,
    });
  }

  render() {
    return (
      <div>
        <div className="header" style={{ position: "relative", left: "1%" }}>
          <p>Total Students in Session: {this.state.totalStudentsConnected}</p>
          <h2>
            Session Code: {sessionID}
            <input
              style={{
                display: "inline",
                left: "3%",
                position: "relative",
                maxWidth: "250px",
                backgroundColor: this.state.avgColorRGB,
                fontSize: 30,
                height: "15%",
                width: "25%",
                textAlign: "center"
              }}
              type="text"
              placeholder={"Avg"}
              value={"Avg: " + this.state.average_rating}
            ></input>
          </h2>
        </div>

        <div>
          { this.state.display && <Histogram chartData={this.state.chartData}></Histogram>}
          { !this.state.display && <LineChart chartData={this.state.lineChartData}></LineChart>}
          <div className="chat_window">
            <div className="top_menu">
              <div className="buttons">
                <div className="button exit"></div>
                <div className="button minimize"></div>
                <div className="button maximize"></div>
              </div>
              <div className="title">Chat Feed</div>
            </div>
            <ul ref={this.messages} id="messages" className="messages">
              {this.state.allMessages.map((item, i) => (
                <li key={i}>{item.comment} </li>
              ))}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              ></div>
            </ul>

            <div className="bottom_wrapper clearfix"></div>
          </div>
          <Button style={{ width: 300 }} variant="dark" onClick={this.toggle}>Toggle</Button>
        </div>
      </div>

      // <LineChart chartData={this.state.chartData} />
    );
  }
}
export default Dashboard;
