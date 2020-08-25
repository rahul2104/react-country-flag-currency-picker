import React from 'react'
import { render } from 'react-dom'
import * as Highlight from 'react-syntax-highlight';
import './scss/demo.scss';
import '../../scss/react-flags-currency-select.scss';
import 'highlight.js/styles/default.css';

import ReactCountryFlagsCurrencySelect from '../../src';

class Demo extends React.Component {
	onSelectFlag=(country)=>{
		console.log(country)
	}
	render() {
		return (
			<div>
				<div className="header">
					<span className="title">React Country Currency with Flags Select</span>
				</div>
				<div className="main">

					<div className="section-header">
						<span>Examples</span> 
					</div>
					<hr />
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Default</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactCountryFlagsCurrencySelect />'} />
						</div>
						<ReactCountryFlagsCurrencySelect onSelect={this.onSelectFlag}/>
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Default Country</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactCountryFlagsCurrencySelect \n defaultCountry="US" />'} />
						</div>
						<ReactCountryFlagsCurrencySelect
					    defaultCountry="US" />
					</div>
					<div className="demo-group">
						<div className="demo-group-title">
							<span>Searchable (with placeholder)</span>
						</div>
						<div className="demo-source">
							<Highlight lang={'js'} value={'<ReactCountryFlagsCurrencySelect \n searchable={true} \n searchPlaceholder="Search for a country" />'} />
						</div>
						<ReactCountryFlagsCurrencySelect
							searchable={true}
							searchPlaceholder="Search for a country" />
					</div>
				</div>
			</div>
		)
	}
}



render(<Demo/>, document.querySelector('#demo'));
