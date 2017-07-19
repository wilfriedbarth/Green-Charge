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
      this.setState({devices: data});
    }.bind(this));
  }

  // capture user input for particleID in state
  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  turnOn(event, data) {
    apiCaller.setStatus(data.id, 'on').then(function(data) {
      console.log(data);
      this.getDevices();
    }.bind(this));
  }

  turnOff(event, data) {
    apiCaller.setStatus(data.id, 'off').then(function(data) {
      console.log(data);
      this.getDevices();
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
                    {device.chargingStatus &&
                    <Icon name='plug' color='green' />
                    }
                    {!device.chargingStatus &&
                    <Icon name='plug' color='red' />
                    }
                    <p>{device.particleId}</p>
                  </Item.Meta>
                  <Item.Description>
                    <Checkbox id={device._id} label='Auto' toggle defaultChecked={device.auto} onChange={this.toggleAuto.bind(this)}/>
                  </Item.Description>
                  <Item.Extra>
                    {!device.auto && !device.chargingStatus &&
                      <Button id={device.particleId} basic size='mini' onClick={this.turnOn.bind(this)} color='olive'><Icon name='plug' color='olive'/>Turn On</Button>
                    }
                    {!device.auto && device.chargingStatus &&
                      <Button id={device.particleId} basic size='mini' onClick={this.turnOff.bind(this)} color='orange'><Icon name='remove' color='orange'/>Turn Off</Button>
                    }
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