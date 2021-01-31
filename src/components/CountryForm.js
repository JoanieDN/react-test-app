import { Component } from 'react';
import { CountryService } from '../service/CountryService';


export default class CountryForm extends Component{

    constructor(props){
        super();
        this.state = {
            countryName:''
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.countryService = new CountryService();
    }

    submitHandler  = event =>{
        event.preventDefault()
       this.countryService.saveNewCountry(this.state);
  
       //this.cityService.updateCity()
  
      }

      changeHandler(event){
        this.setState({
            countryName : event.target.value
          })
      }

    render(){
        const {countryName} = this.state
    
        return(
            <>
                <h4>New country </h4>
                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" >Country name</span>
                        </div>
                        <input type="text" name="countryName" 
                        value={countryName} 
                        onChange={this.changeHandler}
                        className="form-control" required="required"/>
                            </div>
                        </div>
                        <div className="col-6">
                        <button type="submit" className="btn btn-light" >Save</button>
                        </div>
                    </div>
                </form>
                
            </>

        )
    }


}