import React, { Component } from 'react';
import { Form, Item, Icon, Checkbox, Button } from 'semantic-ui-react';
import apiCaller from '../actions/api.js';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'newParticleId': '',
      'devices' : []
    }
  }

  componentWillMount() {
    this.getDevices();
  }

  // submit user input for particleID
  handleSubmit(event) {
   apiCaller.addDevice(this.state.newParticleId).then(function(data) {
      // refresh state post db-update
      this.getDevices();
    }.bind(this));
    // clear form inputs
    document.getElementById('newDeviceForm').reset();
  }

  toggleAuto(event, data) {
    apiCaller.toggleAutoCharge(data.id, data.checked).then(function(data) {
      // refresh state post db-update
      this.getDevices();
    }.bind(this));

  }

  getDevices() {
    apiCaller.getUserDevices().then(function(data) {
      // set state with db info
      this.setState({devices: data});
      // get status of each particle device and update it in the state 
      this.state.devices.map(device => (this.getStatus(device.particleId)));
    }.bind(this));
  }

  getStatus(particleId) {
    apiCaller.getStatus(particleId).then(function(data) {
      console.log('status for ' + particleId + ' is ' + data);
      const newState = this.state;
      // get device with matching particleId
      const deviceIndex = newState.devices.findIndex((device => device.particleId = particleId));
      // update chargingStatus in the state for that device
      newState.devices[deviceIndex].chargingStatus = data;
      console.log(newState.devices);
      this.setState(newState);
    }.bind(this));
  }

  // capture user input for particleID in state
  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  turnOn(event, data) {
    const particleId = data.id;
    apiCaller.setStatus(particleId, 'on').then(function(data) {
      console.log('turned on' + particleId);
      console.log(data);
      // get status & save to state (refresh)
      this.getStatus(particleId);
    }.bind(this));
  }

  turnOff(event, data) {
    const particleId = data.id;
    apiCaller.setStatus(particleId, 'off').then(function(data) {
      console.log('turned off ' + particleId);
      console.log(data);
      this.getStatus(particleId);
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h4>Devices</h4>
        {this.state.devices.length > 0 && 
        <Item.Group divided>
          {this.state.devices.map((device, index) => (
              <Item key={index}>
                <Item.Content>
                  <Item.Meta>
                    <p>{device.particleId}</p>
                  </Item.Meta>
                  <Item.Description>
                    {device.chargingStatus &&
                    <Icon name='plug' size='large' color='green' />
                    }
                    {!device.chargingStatus &&
                    <Icon name='plug' size='large' color='red' />
                    }
                    {!device.auto && !device.chargingStatus &&
                      <Button id={device.particleId} basic size='mini' onClick={this.turnOn.bind(this)} color='olive'><Icon name='plug' color='olive'/>Turn On</Button>
                    }
                    {!device.auto && device.chargingStatus &&
                      <Button id={device.particleId} basic size='mini' onClick={this.turnOff.bind(this)} color='red'><Icon name='remove' color='red'/>Turn Off</Button>
                    }
                  </Item.Description>
                  <Item.Extra>
                    <Checkbox id={device._id} label='Auto' toggle defaultChecked={device.auto} onChange={this.toggleAuto.bind(this)}/>
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
        }
        <Form id='newDeviceForm' onSubmit={this.handleSubmit.bind(this)}>
          <Form.Input id='newParticleId' label='Add particle device by id' type='text' onChange={this.handleChange.bind(this)} />
          <Form.Button>Add Device</Form.Button>
        </Form>
      </div>
    )
  }
}

export default Devices;