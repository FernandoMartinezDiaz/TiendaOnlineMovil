import Constants from "expo-constants";

const ENV = {
    dev: {
        apiUrl: "https://amazon-products1.p.rapidapi.com/",
        apiKey: "c26f5148a4mshb63aca7be40c9f9p11eb94jsn99e90a125903",
        apiHost:"amazon-products1.p.rapidapi.com",
        apiImageUrl:"https://images-na.ssl-images-amazon.com/images/I/",
        apiUrlSearch: "https://m.media-amazon.com/images/I/",
        useQuery: "true" 
    },

    default: {
        apiUrl: "https://amazon-products1.p.rapidapi.com/",
        apiKey: "c26f5148a4mshb63aca7be40c9f9p11eb94jsn99e90a125903",
        apiHost:"amazon-products1.p.rapidapi.com",
        apiImageUrl:"https://images-na.ssl-images-amazon.com/images/I/",
        apiUrlSearch: "https://m.media-amazon.com/images/I/",
        useQuery: "true"
    },
};

const getEnvVars = (env = Constants.manifest.realeaseChannel) => {
    

    if (__DEV__) {
        return ENV.dev;
    }else if (env == "default"){
        return ENV.default;
    }
};

export default getEnvVars;