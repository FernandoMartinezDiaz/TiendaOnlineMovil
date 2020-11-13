

import axios from "axios";
import getEnvVars from "../../enviroments";

const { apiUrl, apiKey ,apiHost,useQuery } = getEnvVars();

//Intancia de conexion
const instance = axios.create({
    baseURL: 'https://amazon-products1.p.rapidapi.com/',
    headers: {
        'x-rapidapi-key' : 'c26f5148a4mshb63aca7be40c9f9p11eb94jsn99e90a125903',
        'x-rapidapi-host' : 'amazon-products1.p.rapidapi.com',
        'useQueryString': true
    }
});

export default instance;