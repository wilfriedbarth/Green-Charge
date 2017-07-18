import React, { Component } from 'react';
import { Dropdown, Button, Form } from 'semantic-ui-react';
import apiCaller from './utils/api.js';
import countryOptions from './countryListReference';
import Graph from './Graph';


class SearchBar extends Component {
	constructor(props) {
		super(props);

		
		this.handleChange = this.handleChange.bind(this);
		
	}


  	handleChange (e, data) {
  		this.props.handleChangeCountry(data.value)
  	}

  	// componentWillReceiveProps(nextProps) {
  	// 	console.log("Received props!")
  			
  	// }

		render () {
				

			return(
				<form>
				<Dropdown  
				placeholder='Country' 
				search selection
				options={countryOptions}
				value = {this.props.selectedCountry}
				onChange={this.handleChange}
				/>
				</form>
			)		
		}
	
}

export default SearchBar;