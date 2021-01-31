import './App.css';
import { Component } from 'react';
import { CityService } from './service/CityService';
import { CountryService } from './service/CountryService';
import { Modal } from './components/Modal';

export default class App extends Component{

  constructor(props){
    super();
    this.state = {
      cities:[],
      city: [],
      countries : [],
      countryId : 0,
      cityName : '',
      modalOptionForm: 0,
      cityId : 0
    }

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.cityEdit = this.cityEdit.bind(this)
    this.changeForm = this.changeForm.bind(this);
    this.cityService = new CityService();
    this.countryService = new CountryService();
  }
  
  
     async getAllCountries(){
        await this.countryService.getAllCountries().then(data =>
          this.setState({
            countries: data
        }))
    }

    async getAllCities(){
      await this.cityService.getAllCities().then(data =>
        this.setState({
          cities: data
    }))
    }


    saveNewCity(){
      this.cityService.saveNewCity();
    }

    handleCountryChange = event => {
      this.setState({
        countryId : event.target.value
      })
    }

    changeHandler = event =>{
      this.setState({
        cityName : event.target.value
      })
    }


    changeForm(){
      this.setState({
        modalOptionForm : 1
      })
    }


    submitHandler  = event =>{
      event.preventDefault()
     this.cityService.saveNewCity(this.state);
    }
  
  componentDidMount(){
    this.getAllCountries();
    this.getAllCities();
    
  }

  cityEdit(id) {
    this.setState({
      modalOptionForm : 2
    })
    this.setState({
      cityId: id
    })
  }
  
  cityDelete(id){
    this.cityService.deleteCity(id);
  }

  render(){

    const {countries, cities, countryId, cityName, modalOptionForm, cityId} = this.state
    
    return(
      <>
      <div className="container">

       <h1>Cities</h1>

       <div className="card">
          <div className="card-body">
            <h5 className="card-title">New city</h5>
            
            <form onSubmit={this.submitHandler}>
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

                <div className="col-3"> 
                  <button className="btn btn-light" data-toggle="modal" 
                  data-target="#myModal"
                  onClick={this.changeForm}
                  >New Country</button>
                </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default" >City's name</span>
                  </div>
                  <input type="text" name="cityName" 
                  value={cityName} 
                  onChange={this.changeHandler}
                  className="form-control"  required="required"/>
                </div>
              </div>
            </div>
            
            <button type="submit" className="btn btn-light" >Save</button>
            </form> 

          </div>
        </div>

      
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Cities</h5>
            
                    <table className="table">
                    <thead>
                      <tr>  
                        <th> ID</th>
                        <th>Name</th>
                        <th>Country</th>  
                        <th colSpan="2">Actions</th>  
                      </tr>
                    </thead>
                    <tbody>
                    {
                      cities.map(
                        city =>
                        <tr>
                          <td key={city.id}>{city.id}</td>
                          <td key={city.name}>{city.name}</td>
                          <td key={city.country.name}>{city.country.name}</td>
                          <td key={city.id+"edit-section"}>
                            
                            <button type="button"  key={city.id+"edit"} 
                              data-toggle="modal" 
                              data-target="#myModal"
                              className="btn btn-primary" 
                              onClick={() => this.cityEdit(city.id)}>Edit</button>

                          </td>
                          <td key={city.id+"delete-dection"}>
                             <button type="button" key={city.id+"delete"}  
                              className="btn btn-danger" 
                              onClick={() => this.cityDelete(city.id)}>Delete</button>
                          </td>
                        </tr>
                      ) 
                    }

                    </tbody>
                    </table>
            </div>
        </div>
      </div>

      <Modal option={modalOptionForm} cityId={cityId}></Modal>
      </>
    )
  }


}