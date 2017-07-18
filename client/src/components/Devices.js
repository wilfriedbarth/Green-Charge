import React, { Component } from 'react';
import { Form, Item, Icon, Checkbox, Button } from 'semantic-ui-react';

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
    // this.setState({devices: [
    //   {
    //     'particleId':'1e0032123447343149111039',
    //     'userId': '12o319',
    //     'auto':true,
    //     'chargingStatus': 'off',
    //     'countryCode': 'US'
    //   }, 
    //   {
    //     'particleId':'1e0032199993748362955326',
    //     'userId': '1231890',
    //     'auto': true,
    //     'chargingStatus': 'on',
    //     'countryCode': 'FR'
    //   },
    //   {
    //     'particleId':'1e0032123582724834444321',
    //     'userId': '12o8316',
    //     'auto': false,
    //     'chargingStatus': 'off',
    //     'countryCode': 'US'
    //   }
    // ]
    // });
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

  // submit user input for particleID
  handleSubmit(event) {
   apiCaller.addDevice(this.state.newParticleId).then(function(data) {
      console.log(data);
      // refresh state 
      this.getDevices();
    }.bind(this));
  }

  forceCharge(event, data) {
    // TODO apiCaller 
    console.log('turn charge on');
    console.log(data.id);
  }

  toggleAuto(event, data) {
    // TODO apiCaller
    console.log('auto' + data.checked);
    console.log(data.id);
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
                    {device.chargingStatus === true &&
                    <Icon name='plug' color='green' />
                    }
                    {device.chargingStatus !== true &&
                    <Icon name='plug' color='red' />
                    }
                    <p>{device.particleId}</p>
                  </Item.Meta>
                  <Item.Description>
                    <Checkbox id={device.particleId} label='Auto' toggle defaultChecked={device.auto} onChange={this.toggleAuto}/>
                  </Item.Description>
                  <Item.Extra>
                    {!device.auto &&
                      <Button id={device.particleId} basic size='mini' onClick={this.forceCharge} color='olive'><Icon name='plug' color='olive'/>Charge</Button>
                    }
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
        }
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Input id='newParticleId' label='Add particle device by id' type='text' onChange={this.handleChange.bind(this)} />
          <Form.Button>Add Device</Form.Button>
        </Form>
      </div>
    )
  }
}

export default Devices;