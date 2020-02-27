import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

export class LineChart extends Component {
  //Initial state
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }
  // After the props/data comes in, set new state.
  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined && nextProps !== null) {
      this.setState({ chartData: nextProps.chartData });
      console.log("Heyhskhfkjfshdjf" + this.chartData);
    }
  }
  // Default actions the Chart will display
  static defaultProps = {
    displayTitle: true
  };

  render() {
    return (
      <div className="Graph">
        <Line
          options={{
            title: {
              display: true,
              text: "Number of Students over Time",
              fontsize: 40,
              fontcolor: "black"
            },
            responsive: true
          }}
          data={this.state.chartData}
        />
      </div>
    );
  }
}

export default LineChart;
