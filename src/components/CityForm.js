import { Component } from 'react';
import { CityService } from '../service/CityService';
import { CountryService } from '../service/CountryService';
import React, { useState } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';

export default class CityForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            city:[],
            countries: [],
            cityId: 0,
            cityName: '',
            countryId : 0
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.cityService = new CityService();
        this.countryService = new CountryService();
    }

    changeHandler(event){
        this.setState({
            cityName:event.target.value
        })
      }

      async getAllCountries(){
        const cityId  =  this.props.cityId
        if(cityId !== 0){
            await this.countryService.getAllCountries().then(data =>
                this.setState({
                  countries: data
              }))
        }
        console.log(this.state);
    }


      async findCity(){
          const cityId  =  this.props.cityId
        if(cityId !== 0){
            await this.cityService.findCity(cityId).then(data =>
                this.setState({
                    cityId: data.id,
                    cityName : data.name,
                    countryId : data.country.id
            }))
    
        }
        console.log(this.state);
      }


      handleCountryChange = event => {
        this.setState({
          countryId : event.target.value
        })
      }
    
      submitHandler  = event =>{
        event.preventDefault()
       this.cityService.updateCity(this.state)
      }

      componentDidMount(){  
       this.findCity();
       this.getAllCountries();
       
      }

      render(){
          const { cityId, cityName, countryId, countries } = this.state

          
          return(
            <>
              <form  onSubmit={this.submitHandler}>
                <div className="row">
                    <div className="col-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" >ID</span>
                            </div>
                            <input type="text" className="cityId" 
                                    value={cityId} 
                                    onChange={this.changeHandler}
                                    className="form-control" disabled/>
                        </div>
                    </div>
                </div>

                
                <div className="row">
                    <div className="col-6">
                    <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default" >Name</span>
                    </div>
                    <input type="text" name="cityName" 
                    value={cityName} 
                    onChange={this.changeHandler}
                    className="form-control" required="required" />
                    </div>
                </div>
                </div>


                <div className="row">
                    <div className="col-9">
                    <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="countryId" value={countryId} >Country</label>
                    </div>
                        <select className="custom-select" id="countryId" 
                        name="countryId"
                        onChange={this.handleCountryChange}
                        value={countryId}>
                            <option key={0} value={0} disabled={true}></option>
                            {
                            countries.map(
                                country =>
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ) 
                            }
                            </select>
                        </div>
                        </div>
                    </div>

                    <div class ="row">
                        <div className="col-6">
                            <button type="submit" className="btn btn-light" >Save</button>
                        </div>
                    </div>
                </form> 
            </>
          )
      }
    





    

}