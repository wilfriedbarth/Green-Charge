import React, { Component } from 'react';
import { Dropdown, Button, Form } from 'semantic-ui-react';
import apiCaller from './utils/api.js';
import  countryOptions  from './countryListReference';


class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {value: ""}
		
		this.onCountryChange = this.onCountryChange.bind(this);
		
	}


  	onCountryChange (evnt, data) {
  	 	this.setState({ value: data.value})
  	 	console.log(this.state.value)
  	 	
  	}


		render () {
				

			return(
				<form>
				<Dropdown  
				placeholder='Country' 
				search selection
				options={countryOptions}
				value = {this.state.value}
				onChange={this.onCountryChange}
				/>
				</form>
			)		
		}
	
}

export default SearchBar;