import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { Container, Grid, Checkbox, List } from 'semantic-ui-react';
import Chart from './Chart';
import apiCaller from '../actions/api.js';
import SearchBar from './Search_Bar';

// graph component 
class Graph extends Component {

  // default two values of 0s -> flat line before data loaded
  constructor(props) {
    super(props);
    this.state = {
      countryData: {
        countryCode: 'NA',
        carbonIntensity: [0,0],
        production: [
        {
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
        {
            wind: 0,
            solar: 0,
            hydro: 0,
            gas: 0,
            nuclear: 0,
            oil: 0,
            biomass: 0,
            geothermal: 0,
            coal: 0
        }
        ]
      },
      graphs: {
        carbon: true,
        hydro: true,
        wind: true,
        solar: true,
        nuclear: false,
        geothermal: false,
        biomass: false,
        coal: false,
        gas: false,
        oil: false
      }
    }
  }
  


  componentWillReceiveProps(nextProps) {
    const countryCode = nextProps.selectedCountry;
    // get dynamic carbon data 
    apiCaller.getCountryData(countryCode).then(function(data) {
      const countryData = this.state.countryData;
      countryData.carbonIntensity = data; 
      this.setState({countryData: countryData});
    }.bind(this));
    // get static production data 
    const production = apiCaller.getProductionData();
    const countryData = this.state.countryData;
    countryData.production = production;
    this.setState({countryData: countryData});
  }

  // TODO: checkboxes to filter which graphs visible
  showHideGraphs(event, data) {
    const graphState = this.state.graphs;
    graphState[data.id] = data.checked;
    this.setState(graphState);
  }

  render() {
    const countryName = this.state.countryData.countryCode;
    const carbon = this.state.countryData.carbonIntensity;
    const hydro = this.state.countryData.production.map(obj => (obj.hydro));
    const wind = this.state.countryData.production.map(obj => (obj.wind));
    const nuclear = this.state.countryData.production.map(obj => (obj.nuclear));
    const solar = this.state.countryData.production.map(obj => (obj.solar));
    const geothermal = this.state.countryData.production.map(obj => (obj.geothermal));
    const coal = this.state.countryData.production.map(obj => (obj.coal));
    const biomass = this.state.countryData.production.map(obj => (obj.biomass));
    const gas = this.state.countryData.production.map(obj => (obj.gas));
    const oil = this.state.countryData.production.map(obj => (obj.oil));

    return(
      // <p>{this.state.value}</p>
      <Grid divided='vertically'> 
        <Grid.Row columns={3}>
          <Grid.Column>
            <List>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='carbon' label={<label>Carbon</label>} defaultChecked/></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='hydro' label={<label>Hydro</label>} defaultChecked/></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='wind' label={<label>Wind</label>} defaultChecked/></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='solar' label={<label>Solar</label>} defaultChecked/></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='nuclear' label={<label>Nuclear</label>} /></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='geothermal' label={<label>Geothermal</label>} /></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='biomass' label={<label>Biomass</label>} /></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='coal' label={<label>Coal</label>} /></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='gas' label={<label>Gas</label>} /></List.Item>
              <List.Item><Checkbox onChange={this.showHideGraphs.bind(this)} id='oil' label={<label>Oil</label>} /></List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          {this.state.graphs.carbon &&
          <Grid.Column>
            <Chart name={'Carbon Intensity'} data={carbon} color='pink' units='gC02eq/kWh'/>
          </Grid.Column>
          }
          {this.state.graphs.hydro &&
          <Grid.Column>
            <Chart name={'Hydro Production'} data={hydro} color='orange' units='MW'/>
          </Grid.Column>
          } 
          {this.state.graphs.wind &&
          <Grid.Column>
            <Chart name={'Wind Production'} data={wind} color='#E500E9' units='MW'/>
          </Grid.Column>
          }
          {this.state.graphs.solar &&
          <Grid.Column>
            <Chart name={'Solar Production'} data={solar} color='#F9354C' units='MW'/>
          </Grid.Column>
          }

          {this.state.graphs.nuclear &&
          <Grid.Column>
            <Chart name={'Nuclear Production'} data={nuclear} color='#F9FF66' units='MW'/>
          </Grid.Column>
          }
          {this.state.graphs.geothermal &&
          <Grid.Column>
            <Chart name={'Geothermal Production'} data={geothermal} color='#76B0FC' units='MW'/>
          </Grid.Column>
          }
          {this.state.graphs.biomass &&
          <Grid.Column>
            <Chart name={'Biomass Production'} data={biomass} color='#99FF57' units='MW'/>
          </Grid.Column>
          }

          {this.state.graphs.coal &&
          <Grid.Column>
            <Chart name={'Coal Production'} data={coal} color='#FB0017' units='MW'/>
          </Grid.Column>
          }
          {this.state.graphs.gas &&
          <Grid.Column>
            <Chart name={'Gas Production'} data={gas} color='#E0008D' units='MW'/>
          </Grid.Column>
          }
          {this.state.graphs.oil &&
          <Grid.Column>
            <Chart name={'Oil Production'} data={oil} color='#F65B07' units='MW'/>
          </Grid.Column>
          }
        </Grid.Row>
      </Grid>

    )
  }
}

export default Graph;

// TODO: handle null values in data
