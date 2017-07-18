import React, { Component } from 'react';
import { Dropdown, Button, Form } from 'semantic-ui-react';
import apiCaller from '../actions/api.js';
import  countryOptions  from './countryListReference';
import Graph from './Graph';


class SearchBar extends Component {
	constructor(props) {
		super(props);


		this.state = {
			countryOptions: props.value
		};

		this.onCountryChange = this.onCountryChange.bind(this);
		
	}


  	onCountryChange (e, data) {
  	 	this.setState({ value: event.target.value})
  	 	
  	}


  	// onCountrySelect (e,data){
  	// 	this.props.showHideGraphs(this.state.countryOptions);
  	// 	console.log(this.state.countryOptions)
  	// }


		render () {
				
			// const countryValue = this.state.countryOptions.props.value.map(props=>props.value);

			return(
				<form>
				<Dropdown  
				placeholder='Country' 
				search selection
				options={countryOptions}
				value = {this.state.countryValue}
				onChange={this.onCountryChange}
				/>
				</form>
			)	
			console.log(this.state.countryValue)	
		}
	
}

export default SearchBar;