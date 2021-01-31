import axios from 'axios';

export class CountryService{

    baseUrl  = "http://localhost:8080/";

    getAllCountries(){
        return axios.get(this.baseUrl + 'country')
        .then(
            res => res.data
            );
    }

    saveNewCountry(obj){

        axios.post(this.baseUrl + 'country/new-country', { 
              "name": obj.countryName
          })
          .then(res => {
              window.location.reload(); 
          })

  }
}
