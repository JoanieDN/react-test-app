import axios from 'axios';

export class CityService{

    baseUrl  = "http://localhost:8080/";

    getAllCities(){
        return axios.get(this.baseUrl + 'city')
        .then(
            res => res.data
            );
    }


    saveNewCity(obj){

           axios.post(this.baseUrl + 'city/new-city', { 
                "name": obj.cityName,
                "country" : {
                    "id" : obj.countryId           
                }
            })
            .then(res => {
                window.location.reload(); 
            })

    }

    findCity(cityId){

        return axios.post(this.baseUrl + 'city/find-city/'+cityId)
        .then(
            res => res.data
            );

    }

    updateCity(obj){

        axios.put(this.baseUrl + 'city/'+obj.cityId, { 
            
                "name": obj.cityName,
                "country" : {
                    "id" : obj.countryId
                }
  
           })
            .then(res => {
                window.location.reload(); 
            })

    }


    deleteCity(id){
        
        axios.delete(this.baseUrl + 'city/'+id)
            .then(res => {
                window.location.reload(); 
            })
        
    }
    

    
}
