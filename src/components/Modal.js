import { Component } from 'react';
import CountryForm from './CountryForm'
import CityForm from './CityForm'
import { EXITED } from 'react-transition-group/Transition';

export class Modal extends Component{

    constructor(props){
        super();
        this.state = {
            formOption : 0,
            cityId: 0
        }

        this.setStates = this.setStates.bind(this);
        this.cleanStates = this.cleanStates.bind(this);
    }

    setStates(){
        const cityId = this.props.cityId
        
        if(cityId != 0){

            this.setState({
                cityId: this.props.cityId,
                formOption: this.props.formOption
            })
        }

        console.log(this.state);
        
    }

    modalHidden(){
        window.location.reload(); 
    }

    cleanStates(){
        this.setState({
            cityId: 0,
            formOption:0
        })
        console.log(this.state);
    }
   
    componentDidMount(){
       this.setStates();
    }
 
  render(){
      const formOption = this.props.option
      const cityId = this.props.cityId
      return (
           
            <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
            
                <div className="modal-content">
                <div className="modal-header">


                <button type="button"  key={"close-button"} 
                              className="close" 
                                data-dismiss="modal" 
                              onClick={() => this.modalHidden()}>&times;</button>
                </div>
                <div className="modal-body">
                {(()=> {
                        if (formOption == 1) {
                            return <CountryForm></CountryForm>
                        }  
                        if (formOption == 2)  {
                            return <CityForm cityId={cityId}></CityForm>
                        }
                        })()}
                </div>
                <div className="modal-footer">
                    <button type="button"  key={"close-button-btn"} 
                              className="close" 
                              className="btn btn-default"
                              onClick={() => this.modalHidden()}>Close</button>
                </div>
                </div>
                
            </div>
            </div>
      )
  }  
  

}
