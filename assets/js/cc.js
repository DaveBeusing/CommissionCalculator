/**
 * Copyright (c) 2025 Dave Beusing <david.beusing@gmail.com>
 *
 * MIT License - https://opensource.org/license/mit/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
export default class CommissionCalculator {
	/**
	 * Constructor
	 */
	constructor( debug=false ){
		this.debug = debug;
		this.factor = {
			regular : 6,
			gold : 10
		};
		this.elements = {
			period_of_employment : this.$( '#period-of-employment' ),
			margin_previous_year : this.$( '#margin-previous-year' ),
			margin_current : this.$( '#margin-current' ),
			margin_gold : this.$( '#margin-gold' )
		};
	}
	/**
	 * Element Grabber
	 * @param {*} str
	 * @returns document.element
	 */
	$( element ){
		return document.querySelector( element );
	}
	/**
	 * Parser
	 * @param {*} str
	 * @returns float
	 */
	parse( str ){
		return parseFloat( str.replace( /,/,'.' ) );
	}
	/**
	 * Main routine
	 */
	run(){
		this.calculate();
		for(let [name, element] of Object.entries( this.elements ) ){
			if( this.debug ) console.log( `${name}: ${element}` );
			element.addEventListener( 'change', function( event ){ 
				//catch new employees target
				if( event.target.id == "period-of-employment" ){
						if( this.debug ) console.log( this.$("#period-of-employment").value );
						this.$("#margin-previous-year").value = this.$("#period-of-employment").value;
				}
				//calculate
				this.calculate();
			}.bind( this ), false );
		}
	}
	/**
	 * 
	 */
	calculate(){
		const margin_c = ( this.parse( this.elements.margin_current.value ) * this.factor.regular / 100 );
		const margin_i = ( ( this.parse( this.elements.margin_current.value ) - this.parse( this.elements.margin_previous_year.value ) ) * this.factor.regular / 100 );
		const margin_g = ( this.parse( this.elements.margin_gold.value ) * this.factor.gold / 100 );
		const margin_t = margin_c + margin_i + margin_g;
		this.$( '#cc-result-margin-base' ).innerHTML = `${margin_c} EUR`;
		this.$( '#cc-result-margin-increase' ).innerHTML = `${margin_i} EUR`;
		this.$( '#cc-result-margin-gold' ).innerHTML = `${margin_g} EUR`;
		this.$( '#cc-result-margin-total' ).innerHTML = `${margin_t} EUR`;
	}
}