import { Content, H1 } from "native-base";
import React, { useState } from "react";
import { StyleSheet ,View ,Text} from "react-native"
import backend from "../api/backend";
import getEnvVars from "../../enviroments";

const { apiUrl ,apiKey } = getEnvVars();

const ProductSearchResults = ({ route, navigation }) => {
    //obtenemos los parametros de nuestra navegacion
    const { search } = route.params;
    const [product, setProduct] = useState(null);

    //obtiene las peliculas en terminos de busqueda

    const getSearchProduct = async () => {
        const response = await backend.get(`${apiUrl}search?country=US&query=${search}`);

        console.log(response.data);
    }

    getSearchProduct();

    return (
        <Content>
            <H1>Resultados de la busqueda : {search}</H1>
        </Content>
    )
}

const styles = StyleSheet.create({});

export default ProductSearchResults;