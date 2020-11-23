import { Container, H1, Spinner, Card, CardItem, Item} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet ,View ,Text, Dimensions, Image } from "react-native"
import backend from "../api/backend";
import getEnvVars from "../../enviroments";
import { FlatList } from "react-native-gesture-handler";

const { apiUrl , apiKey, apiUrlSearch, apiImageUrl} = getEnvVars();

const {width, height} = Dimensions.get("window");

const ProductSearchResults = ({ route, navigation }) => {
    //obtenemos los parametros de nuestra navegacion
    const { search } = route.params;
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);

    //obtiene las peliculas en terminos de busqueda

    const getSearchProduct = async () => {

        try {
            const response = await backend.get(`${apiUrl}search?country=US&query=${search}`);

        setProduct(response.data);
        } catch (error) {
          setError(true);
        }

    }

    
    //Efecto para Comunicarnos 
    useEffect(() => { 
     getSearchProduct();
    }, []);

    if (!product) {
        return (
            <Container>
                <Spinner />
            </Container>
        )
    }

    return (
        <Container>
            <H1>Resultados de la busqueda : {search}</H1>
            <FlatList 
            data={product.results}
            keyExtractor={(item) => item.asin}
            renderItem={({item}) => {
                return(
                    <View>
                      <Card style = {{backgroundColor: "transparent"}} >
                        <CardItem style={styles.CardStyle}   cardBody>
                               <Image source={{uri: `${item.image}`}}  style={styles.productImage}/>
                        </CardItem>
                        <CardItem style={styles.CardStyle} >
                           <Text>{item.title}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>   Precio del producto: {item.prices.current_price}$</Text>
                        </CardItem>
                      </Card>
                   </View>
                   )
            }}
            />
        </Container>
    )
}

const styles = StyleSheet.create({

    productImage: {
        width: width * 0.81,
        height: height * 0.35,
        marginLeft: 35,
        resizeMode: "contain",
        //resizeMode: "center",
    },

    CardStyle: {
        marginHorizontal: 10,
        backgroundColor: "transparent",
        //resizeMode: "center",
    },
});

export default ProductSearchResults;