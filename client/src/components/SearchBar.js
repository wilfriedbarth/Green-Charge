import React, { Component } from 'react';

import { Dropdown, Button, Form } from 'semantic-ui-react';

class SearchBar extends Component {
	constructor(props) {
		super(props);
	}

  render () {
    const countryOptions = [{value:'US', text:'United States'}, {text: 'Spain'}];
     
    return(
      <Form>
        <Dropdown placeholder='Country' 
        search selection
        options={countryOptions} />
        <Button primary>Submit</Button>
      </Form>
    )	
  }
	
}

export default SearchBar;
