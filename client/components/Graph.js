import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { Container, Grid, Checkbox, List } from 'semantic-ui-react';
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
          carbon: 60,
          electric: 130,
          other: 8
        },
        {
          carbon: 60,
          electric: 140,
          other: 17
        },
        {
          carbon: 36,
          electric: 170,
          other: 20
        }
      ], 
      // display graphs
      carbon: true,
      electric: true,
      other: true
    }
  }

  showHideGraphs(event, data) {
    const newState = {}
    newState[data.id] = data.checked;
    
  }

  render() {
    const carbon = this.state.data.map(data => data.carbon);
    const electric = this.state.data.map(data => data.electric);
    const other = this.state.data.map(data => data.other);

    return(
      <Grid columns={2}>
        <Grid.Row>
          <List>
            <List.Item><Checkbox onChange={this.showHideGraphs} id='carbon' label={<label>Carbon</label>} /></List.Item>
            <List.Item><Checkbox onChange={this.showHideGraphs} id='label' label={<label>Electric</label>} /></List.Item>
            <List.Item><Checkbox onChange={this.showHideGraphs} id='other' label={<label>Other</label>} /></List.Item>
          </List>
        </Grid.Row>
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


