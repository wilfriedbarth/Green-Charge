import React, { Component } from 'react';
import { Sparklines, SparklinesCurve, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import { Container, Grid, Button } from 'semantic-ui-react';

class Chart extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const data = this.props.data;
    const avg = (data.reduce((a, b) => a + b) / data.length).toFixed(1); // sum / length, rounded to 1
    const curr = data[data.length-1].toFixed(1); 
    const min = Math.min(...data).toFixed(1);
    const max = Math.max(...data).toFixed(1);

    return (
        <Grid>
          <Grid.Row>
              <h4>{this.props.name} ({this.props.units})</h4>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={12}>
              <Sparklines data={this.props.data} width={800} height={600} style={{background: "#4C4949"}}>
                <SparklinesLine style={{strokeWidth: 3}} color={this.props.color} />
                <SparklinesReferenceLine type='avg' style={{ stroke: 'white', strokeOpacity: .5, strokeDasharray: '3, 2', strokeWidth: .75 }} />
              </Sparklines>
            </Grid.Column>

            <Grid.Column width={4}>
              <p>Curr: {curr}</p>
              <p>Avg: {avg}</p>
              <p>Min: {min}</p>
              <p>Max: {max}</p>
            </Grid.Column>
          </Grid.Row>

        </Grid>
    )
  }
}

export default Chart;