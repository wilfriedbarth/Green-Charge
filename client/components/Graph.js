import React, { Component } from 'react';
import * as d3 from 'd3';
import { Container } from 'semantic-ui-react';

// subcomponents to render in browser 
class Bottom extends Component {
  render() {

  }
}

class Left extends Component {
  render() {

  }
}

class Data extends Component {
  render() {

  }
}

class Line extends Component {
  constructor(props) {
    super(props);

    // TODO get data and format the times with moment (or d3.time.format??) (use military time)
    this.state = {
      data : [
      {time: '09:30',carbon: 50},
      {time: '10:30',carbon: 40},
      {time: '11:30',carbon: 90},
      {time: '12:30',carbon: 10},
      {time: '13:30',carbon: 50}
      ]
    }
  }

  render() {
    const margin = {top: 5, right: 50, bottom: 20, left: 50};
    const w = 800 - (margin.left + margin.right);
    const h = 300 - (margin.top + margin.bottom);
    const width = 800;
    const height = 300;
    const {data} = this.state;

    // format the times so d3 can read as times
    const parseTime = d3.timeParse('%H:%M');
    const x = d3.scaleTime().domain(d3.extent(data, (d) => {
      return parseTime(d.time);
    })).rangeRound([0, w]);

    const y = d3.scaleLinear().domain([0,d3.max(this.state.data, function(d) {
      return d.carbon;
    })]).range([h,0]);

    const line = d3.line().x(function(d) {
      return x(parseTime(d.time));
    }).y(function(d) {
      return y(d.carbon);
    }).curve(d3.curveCardinal);

    // const svg = d3.select(line).append('svg').attr('width', w).attr('height', h).append('g').attr('transform', transform);

    const transform = `translate(${margin.left},${margin.top})`;

    const divStyle = {
      fill: 'none',
      stroke: 'red'
    }

    return(
      <div>
        <svg id='chart' width={width} height={height}>
          <g transform={transform}>
            <path className='line shadow' d={line(this.state.data)} strokeLinecap='round' style={divStyle} />
          </g>
        </svg>
      </div>
      )
  }
}

// graph component 
class Graph extends Component {
  render() {
    return(
      <div>
        <h1>Graphs</h1>
        <Container>
          <Line />
        </Container>
      </div>
    )
  }
}

export default Graph;


