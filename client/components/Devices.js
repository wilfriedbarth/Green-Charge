import React, { Component } from 'react';
import { Form, Item, Icon, Checkbox } from 'semantic-ui-react';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'newParticleId': '',
      'devices' : []
    }
  }

  componentWillMount() {
    // use sample device data for now
    this.setState({devices: [
      {
        'particleId':'1e0032123447343149111039',
        'userId': '12o319',
        'auto':true,
        'chargingStatus': 'off',
        'countryCode': 'US'
      }, 
      {
        'particleId':'1e0032199993748362955326',
        'userId': '1231890',
        'auto': true,
        'chargingStatus': 'on',
        'countryCode': 'FR'
      },
      {
        'particleId':'1e0032123582724834444321',
        'userId': '12o8316',
        'auto': false,
        'chargingStatus': 'off',
        'countryCode': 'US'
      }
    ]
    });
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    console.log(this.state.newParticleId);
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
                    {device.chargingStatus === 'on' &&
                    <Icon name='plug' color='green' />
                    }
                    {device.chargingStatus !== 'on' &&
                    <Icon name='plug' color='red' />
                    }
                    <p>{device.particleId}</p>
                  </Item.Meta>
                  <Item.Description>
                    <Checkbox label='Auto' toggle defaultChecked={device.auto}/>
                  </Item.Description>
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