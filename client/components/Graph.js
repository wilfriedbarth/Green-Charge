import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { Container, Grid, Checkbox, List } from 'semantic-ui-react';
import Chart from './Chart';
import apiCaller from './utils/api.js';

// graph component 
class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countryData: {
        countryCode: 'NN',
        data: [
        {
          production: {
            wind: 0,
            solar: 0,
            hydro: 0,
            gas: 0,
            nuclear: 0,
            oil: 0,
            biomass: 0,
            geothermal: 0,
            coal: 0
          },
          carbonIntensity: 0
        },
        {
          production: {
            wind: 0,
            solar: 0,
            hydro: 0,
            gas: 0,
            nuclear: 0,
            oil: 0,
            biomass: 0,
            geothermal: 0,
            coal: 0
          },
          carbonIntensity: 0
        }
        ]
      }
    }
  }
  
  componentWillMount() {
    const countryCode = 'US' // TODO: get from searchbar 
    apiCaller.getCountryData(countryCode).then(function(data) {
      this.setState({countryData: data});
    }.bind(this));
  }

  // TODO: checkboxes to filter which graphs visible
  showHideGraphs(event, data) {
    const newState = {}
    newState[data.id] = data.checked;
  }

  render() {
    const countryName = this.state.countryData.countryCode;
    const carbon = this.state.countryData.data.map(obj => (obj.carbonIntensity));
    const hydro = this.state.countryData.data.map(obj => (obj.production.hydro));
    const wind = this.state.countryData.data.map(obj => (obj.production.wind));
    const nuclear = this.state.countryData.data.map(obj => (obj.production.nuclear));
    const solar = this.state.countryData.data.map(obj => (obj.production.solar));
    const geothermal = this.state.countryData.data.map(obj => (obj.production.geothermal));
    const coal = this.state.countryData.data.map(obj => (obj.production.coal));
    const biomass = this.state.countryData.data.map(obj => (obj.production.biomass));
    const gas = this.state.countryData.data.map(obj => (obj.production.gas));
    const oil = this.state.countryData.data.map(obj => (obj.production.oil));

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
            <Chart name={'Carbon Intensity'} data={carbon} color='pink' units='gC02eq/kWh'/>
          </Grid.Column>
          <Grid.Column>
            <Chart name={'Hydro Production'} data={hydro} color='orange' units='check units'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Chart name={'Wind Production'} data={wind} color='#E500E9' units='check units'/>
          </Grid.Column>
          <Grid.Column>
            <Chart name={'Solar Production'} data={solar} color='#65FFF5' units='check units'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Graph;


