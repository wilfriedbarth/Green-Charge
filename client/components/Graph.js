import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { Container, Grid } from 'semantic-ui-react';
import Chart from './Chart';

// graph component 
class Graph extends Component {

  constructor(props) {
    super(props);

    // TODO get data and format the times with moment (or d3.time.format??) (use military time)
    this.state = {
      data: [
        {
          carbon: 50,
          electric: 100,
          other: 4
        },
        {
          carbon: 80,
          electric: 130, 
          other: 10
        },
        {
          carbon: 18,
          electric: 130,
          other: 8
        },
        {
          carbon: 19,
          electric: 140,
          other: 17
        },
        {
          carbon: 20,
          electric: 170,
          other: 20
        }
      ]
    }
  }

  render() {
    const carbon = this.state.data.map(data => data.carbon);
    const electric = this.state.data.map(data => data.electric);
    const other = this.state.data.map(data => data.other);

    return(
      <Grid columns='two'>
        <Grid.Row>
          <Grid.Column>
            <Chart name={'Carbon'} data={carbon} color='pink' units='ERU'/>
          </Grid.Column>
          <Grid.Column>
            <Chart name={'Electric'} data={electric} color='orange' units='kW'/>
          </Grid.Column>
          <Grid.Column>
            <Chart name={'other'} data={other} color='#E500E9' units='big units'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Graph;


