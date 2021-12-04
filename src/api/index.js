import axios from "axios";

const diseaseAPI = axios.create({baseURL: 'https://disease.sh/v3/covid-19'});
const DISEASE = "https://disease.sh/v3/covid-19";

const API = {
    disease: {
        getAllCountries: async () => {
            let response = await diseaseAPI.get("/all");
            return response.data;
        },
        getCountriesList: async () => {
            let response = await fetch(`${DISEASE}/countries`);
            return response.json();
        },
        getCountry: async (country_code = "AZ") => {
            let response = await fetch(`${DISEASE}/countries/${country_code}`);
            return response.json(); 
        },
        getHistoricalByDays: async (lastdays = "30") => {
            let response = await diseaseAPI.get(`/historical/all`, {lastdays});
            return response.data; 
        }
    }
};


export default API;