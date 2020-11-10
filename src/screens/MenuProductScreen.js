//Importacion de modulos necesarios

import React from "react";

//text manda a llamar mas de un solo elemento
import { StyleSheet, Text, View, Image ,Dimensions} from "react-native";
import { Input, Container, Item, Form, H1, Button, Header, Right, Left, Icon } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import backend from "../api/backend";
import getEnvVars from "../../enviroments";

const { apiKey } = getEnvVars();

//dimension poder ajustar ancho y alto de las imagenes
//width .,,, para estirarla a lo alto height * 0.30 tercio de pantalla 
//OBTENER LOS VALORES POR DESTRUCTURING:
const {width, height} = Dimensions.get("window");

//Creacion de variableas que contienen nuestra pantalla 
//arrow function ==>
//H1 ESTILOS 
//image Para representacion de logo  
const MenuProductScreen = () => {
    //maneja el estado de los productos
    const [product, setProduct] = useState(null);
    
    const getProduct = async () =>{
        //consulta la api de amazon product
        const response = await backend.get(`product?api_key=${apiKey}country=US&asin=B07CVL2D2S&`) ;

        console.log(response.data);
    }

    getProduct();

    return(
        <Container style={{backgroundColor: "#b90023"}}>
          <Header searchBar style={{backgroundColor: "#14BBDF"}} >
                <Item>
                    <Input placeholder="Buscar" />
                </Item>
            <Button >
                <MaterialCommunityIcons name="shopping-search" size={24} color="black" /> 
            </Button>
        </Header>
            <H1 style={{marginTop: 10}}>PRODUCTO</H1>
            <Image source={require("../../assets/LOGOnet504MOVIL1.png")} 
            style={styles.imagenLogo}
            />
            <Text> CATALOGO DE PRODUCTOS </Text>
        </Container> 
    );
};

//Llamamos los estilos para nuestra aplicacion 

const styles = StyleSheet.create({
    container: {

        flex : 1 ,
        justifyContent: "center",
        alignItems: "center",
    },
    Input: {
        margin: 15,
    },
    imagenLogo: {
        width: 100,
        height: 100,
        //resizeMode: "center",
    },
    searchInput: {
        flex: 1,
        flexDirection: "row",
        marginTop :25,
        marginRight :15,
    }
});
    

//exportacion de nuestra pantalla 

export default MenuProductScreen;

